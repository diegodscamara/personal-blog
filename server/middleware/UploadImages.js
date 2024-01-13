const multer = require('multer')

// Set up storage engine
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/') // directory to store images
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + file.originalname)
	},
})

// Initialize upload
const upload = multer({ storage: storage })

module.exports = upload
