//userModel.js
var mongoose = require('mongoose');
//schema
var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
// Export User Model
var User = module.exports = mongoose.model('user', userSchema);


module.exports.findByEmail = function (mail) {
    User.find({ email: mail }).limit(1);
}

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}

