const mongoose = require('mongoose')

module.exports = {
    name: 'blacklist',
}

const UserSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    blacklisted: {
        type: Boolean,
        default: false
    }

})


module.exports = mongoose.model('user-info', UserSchema)