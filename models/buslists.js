var mongoose = require('mongoose');

var busListSchema = new mongoose.Schema({
    Bus_no: String,
    Bus_type: String,
    Source: String,
    Destination: String
})

module.exports = mongoose.model('buslist', busListSchema);