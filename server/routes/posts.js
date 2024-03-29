const express = require('express')
const router = express.Router()
const Post = require('../models/Post') // Adjust the path as necessary

// Get all posts
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find()
		res.json({ success: true, posts })
	} catch (err) {
		res.status(500).json({ success: false, message: 'Error fetching posts' })
	}
})

// Submit a post
router.post('/', async (req, res) => {
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		category: req.body.category,
		tags: req.body.tags,
	})

	try {
		const savedPost = await post.save()
		res.status(201).json({
			success: true,
			message: 'Post created successfully',
			post: savedPost,
		})
	} catch (err) {
		res.status(500).json({ success: false, message: 'Error creating post' })
	}
})

// Update a post
router.patch('/:postId', async (req, res) => {
	try {
		const updatedPost = await Post.findByIdAndUpdate(
			req.params.postId,
			{
				$set: {
					title: req.body.title,
					content: req.body.content,
					author: req.body.author,
					category: req.body.category,
					tags: req.body.tags,
				},
			},
			{ new: true }
		)

		if (!updatedPost) {
			return res
				.status(404)
				.json({ success: false, message: 'No post found to update' })
		}

		res.json({ success: true, message: 'Post updated successfully' })
	} catch (err) {
		res.status(500).json({ success: false, message: 'Error updating post' })
	}
})

// Delete a post
router.delete('/:postId', async (req, res) => {
	try {
		const removedPost = await Post.findByIdAndDelete(req.params.postId)
		if (!removedPost) {
			return res
				.status(404)
				.json({ success: false, message: 'No post found to delete' })
		}
		res.json({ success: true, message: 'Post deleted successfully' })
	} catch (err) {
		res.status(500).json({ success: false, message: 'Error deleting post' })
	}
})

// Add a comment
router.post('/:postId/comments', async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId)
		if (!post) {
			return res
				.status(404)
				.json({ success: false, message: 'Post not found for adding comment' })
		}

		const newComment = {
			content: req.body.content,
			author: req.body.author,
		}

		post.comments.push(newComment)
		await post.save()

		res.status(201).json({
			success: true,
			message: 'Comment added successfully',
			comment: newComment,
		})
	} catch (err) {
		res.status(500).json({ success: false, message: 'Error adding comment' })
	}
})

// Get Comments for a Post
router.get('/:postId/comments', async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId).populate('comments')
		if (!post) {
			return res.status(404).json({
				success: false,
				message: 'Post not found for fetching comments',
			})
		}

		res.json({ success: true, comments: post.comments })
	} catch (err) {
		res.status(500).json({ success: false, message: 'Error fetching comments' })
	}
})

// Delete a Comment
router.delete('/:postId/comments/:commentId', async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId)
		if (!post) {
			return res.status(404).json({
				success: false,
				message: 'Post not found for deleting comment',
			})
		}

		post.comments = post.comments.filter(
			(comment) => comment._id.toString() !== req.params.commentId
		)
		await post.save()

		res.json({ success: true, message: 'Comment deleted successfully' })
	} catch (err) {
		res.status(500).json({ success: false, message: 'Error deleting comment' })
	}
})

module.exports = router
