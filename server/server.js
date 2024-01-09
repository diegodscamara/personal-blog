const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const postsRoute = require('./routes/posts')
const userRoutes = require('./routes/users')
require('dotenv').config()

// Middleware
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

// Routes
app.use('/posts', postsRoute)
app.use('/users', userRoutes)

// Database Connection
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error(err))

const PORT = process.env.PORT || 8080

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

module.exports = app
