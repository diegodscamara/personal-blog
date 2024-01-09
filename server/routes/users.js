const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
	try {
		const { name, email, password } = req.body
		const user = new User({ name, email, password })
		await user.save()
		res.status(201).json({ message: 'User created successfully' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})


router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		const token = jwt.sign(
			{ userId: user._id, isAdmin: user.isAdmin },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		)
		res.json({ token })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// List users
router.get('/list', async (req, res) => {
	try {
		const users = await User.find().select('-password') // Excludes passwords from the result
		res.json(users)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// Search users by name or email
router.get('/search', async (req, res) => {
    try {
        const { name, email } = req.query;
        let query = {};
        
        if (name) {
            query.name = new RegExp(name, 'i'); // 'i' for case-insensitive
        }
        if (email) {
            query.email = new RegExp(email, 'i');
        }

        const users = await User.find(query).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//Delete user
router.delete('/:userId', async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.userId)
		if (!deletedUser) {
			return res.status(404).json({ message: 'User not found' })
		}
		res.json({ message: 'User deleted successfully' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

router.get('/check-admin', async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1]
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		res.json({ isAdmin: decoded.isAdmin })
	} catch (err) {
		res.status(401).json({ message: 'Unauthorized' })
	}
})

module.exports = router;
