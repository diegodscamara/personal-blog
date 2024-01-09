const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
	try {
		const { name, email, password } = req.body
		const user = new User({ name, email, password }) // Create new user
		await user.save() // Save the user

		res.status(201).json({
			success: true,
			message: 'User registered successfully',
			user: { id: user.id }, // Return the ID of the saved user
		})
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Error registering user',
			error: err.message,
		})
	}
})

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res
				.status(401)
				.json({ success: false, message: 'Invalid credentials' })
		}

		const token = jwt.sign(
			{ userId: user._id, isAdmin: user.isAdmin },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		)
		res.json({ success: true, token })
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Error during login',
			error: err.message,
		})
	}
})

// List users
router.get('/list', async (req, res) => {
	try {
		const users = await User.find().select('-password')
		res.json({ success: true, users })
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Error fetching users',
			error: err.message,
		})
	}
})

// Search users by name or email
router.get('/search', async (req, res) => {
	try {
		const { name, email } = req.query
		let query = {}
		if (name) query.name = new RegExp(name, 'i')
		if (email) query.email = new RegExp(email, 'i')

		const users = await User.find(query).select('-password')
		res.json({ success: true, users })
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Error searching users',
			error: err.message,
		})
	}
})

//Delete user
router.delete('/:userId', async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.userId)
		if (!deletedUser) {
			return res.status(404).json({ success: false, message: 'User not found' })
		}
		res.json({ success: true, message: 'User deleted successfully' })
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Error deleting user',
			error: err.message,
		})
	}
})

// Update user details
router.patch('/:userId', async (req, res) => {
	try {
		const { name, email, password } = req.body
		let updateData = { name, email }

		// If password is provided, hash it
		if (password) {
			updateData.password = await bcrypt.hash(password, 12)
		}

		const updatedUser = await User.findByIdAndUpdate(
			req.params.userId,
			updateData,
			{ new: true }
		).select('-password')
		if (!updatedUser) {
			return res.status(404).json({ success: false, message: 'User not found' })
		}

		res.json({
			success: true,
			message: 'User updated successfully',
			user: updatedUser,
		})
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Error updating user',
			error: err.message,
		})
	}
})

router.get('/check-admin', async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1]
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		res.json({ isAdmin: decoded.isAdmin })
	} catch (err) {
		res
			.status(401)
			.json({ message: 'Unauthorized or invalid token', error: err.message })
	}
})

module.exports = router
