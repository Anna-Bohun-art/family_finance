//entryModel.js
var mongoose = require('mongoose');
//schema
var entrySchema = mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
// Export Entry Model
var Entry = module.exports = mongoose.model('entry', entrySchema);

module.exports.get = function (callback, limit) {
    Entry.find(callback).limit(limit); 
}
