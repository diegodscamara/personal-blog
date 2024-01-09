const mongoose = require('mongoose')

module.exports = async () => {
	// Close the Mongoose connection
	await mongoose.connection.close()
}
