const request = require('supertest')
const app = require('../server')

describe('Post Routes', () => {
	let newPostId
	let commentId

	// Test for Creating a Post
	describe('POST /posts', () => {
		it('should create a new post', async () => {
			const res = await request(app)
				.post('/posts')
				.send({
					title: 'Test Post',
					content: 'This is a test post',
					author: 'Test Author',
					category: 'Test Category',
					tags: ['test', 'post'],
				})
			expect(res.statusCode).toEqual(201)
			expect(res.body).toHaveProperty('success', true)
			newPostId = res.body.post._id // Store new post ID for further tests
		})
	})

	// Test for Updating a Post
	describe('PATCH /posts/:postId', () => {
		it('should update the post details', async () => {
			const res = await request(app)
				.patch(`/posts/${newPostId}`)
				.send({ title: 'Updated Test Post' })
			expect(res.statusCode).toEqual(200)
			expect(res.body).toHaveProperty('success', true)
		})
	})

	// Test for Adding a Comment to a Post
	describe('POST /posts/:postId/comments', () => {
		it('should add a comment to the post', async () => {
			const res = await request(app).post(`/posts/${newPostId}/comments`).send({
				content: 'This is a test comment',
				author: 'Commenter',
			})
			expect(res.statusCode).toEqual(201)
			expect(res.body).toHaveProperty('success', true)
			commentId = res.body.commentId
		})
	})

	// Test for Getting Comments for a Post
	describe('GET /posts/:postId/comments', () => {
		it('should get comments for the post', async () => {
			const res = await request(app).get(`/posts/${newPostId}/comments`)
			expect(res.statusCode).toEqual(200)
			expect(res.body).toHaveProperty('success', true)
		})
	})

	// Test for Deleting a Comment from a Post
	// Note: This test requires a valid comment ID which should be obtained after creating a comment
	describe('DELETE /posts/:postId/comments/:commentId', () => {
		it('should delete a comment from the post', async () => {
			const res = await request(app).delete(
				`/posts/${newPostId}/comments/${commentId}`
			)
			expect(res.statusCode).toEqual(200)
			expect(res.body).toHaveProperty('success', true)
		})
	})

	// Test for Deleting a Post
	describe('DELETE /posts/:postId', () => {
		it('should delete the post', async () => {
			const res = await request(app).delete(`/posts/${newPostId}`)
			expect(res.statusCode).toEqual(200)
			expect(res.body).toHaveProperty('success', true)
		})
	})
})
