const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
	content: String,
	author: String,
	createdAt: { type: Date, default: Date.now },
})

const postSchema = new mongoose.Schema({
	title: String,
	content: String,
	author: String,
	category: String,
	tags: [String],
	comments: [commentSchema], // Array of comment subdocuments
	createdAt: { type: Date, default: Date.now },
	thumbnail: String,
})

module.exports = mongoose.model('Post', postSchema)
