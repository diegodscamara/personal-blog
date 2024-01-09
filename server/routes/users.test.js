const request = require('supertest')
const app = require('../server') 

describe('User Routes', () => {
	let userId

	// Create a user before running the tests
	beforeAll(async () => {
		const res = await request(app).post('/users/register').send({
			name: 'Test User',
			email: 'testuser@example.com',
			password: 'password123',
		})
		userId = res.body.user.id // Update this based on your actual API response
	})

	// Optionally, clean up after tests
	afterAll(async () => {
		await request(app).delete(`/users/${userId}`)
	})

	// Test for User Registration
	describe('POST /users/register', () => {
		it('should register a new user', async () => {
			const res = await request(app).post('/users/register').send({
				name: 'Another User',
				email: 'anotheruser@example.com',
				password: 'password123',
			})
			expect(res.statusCode).toEqual(201)
			expect(res.body).toHaveProperty('success', true)
		})
	})

	// Test for User Login
	describe('POST /users/login', () => {
		it('should login user and return a token', async () => {
			const res = await request(app).post('/users/login').send({
				email: 'testuser@example.com',
				password: 'password123',
			})
			expect(res.statusCode).toEqual(200)
			expect(res.body).toHaveProperty('success', true)
			expect(res.body).toHaveProperty('token')
		})
	})

	// Test for Listing Users
	describe('GET /users/list', () => {
		it('should list all users', async () => {
			const res = await request(app).get('/users/list')
			expect(res.statusCode).toEqual(200)
			expect(res.body).toHaveProperty('success', true)
		})
	})

	// Test for Searching Users
	describe('GET /users/search', () => {
		it('should search users by name or email', async () => {
			const res = await request(app).get('/users/search?name=Test')
			expect(res.statusCode).toEqual(200)
			expect(res.body).toHaveProperty('success', true)
		})
	})

	// Test for Updating User Details
	describe('PATCH /users/:userId', () => {
		it('should update user details', async () => {
			const res = await request(app)
				.patch(`/users/${userId}`)
				.send({ name: 'Updated Name' })
			expect(res.statusCode).toEqual(200)
			expect(res.body).toHaveProperty('success', true)
		})
	})

	// Test for Check Admin Status
	describe('GET /users/check-admin', () => {
		it('should check if a user is admin', async () => {
			const res = await request(app).get('/users/check-admin')
			expect(res.statusCode).toEqual(401) // Assuming no authentication provided
		})
	})

	// Test for Deleting a User
	describe('DELETE /users/:userId', () => {
		it('should delete a user', async () => {
			const res = await request(app).delete(`/users/${userId}`)
			expect(res.statusCode).toEqual(200)
			expect(res.body).toHaveProperty('success', true)
		})
	})
})
