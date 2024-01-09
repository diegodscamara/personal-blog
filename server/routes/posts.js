const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// Get all posts
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find()
		res.json(posts)
	} catch (err) {
		res.json({ message: err })
	}
})

// Submit a post
router.post('/', async (req, res) => {
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
	})

	try {
		const savedPost = await post.save()
		res.json(savedPost)
	} catch (err) {
		res.json({ message: err })
	}
})

// Update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title, content: req.body.content, author: req.body.author } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete a post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router
