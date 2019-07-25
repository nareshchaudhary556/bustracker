var mongoose = require('mongoose');

var busLocationSchema = new mongoose.Schema({
    Bus_no: String,
    lat: String,
    lng: String
})

module.exports = mongoose.model('buslocation', busLocationSchema);