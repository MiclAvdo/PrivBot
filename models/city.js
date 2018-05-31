let mongoose = require('mongoose');

let citySchema = new mongoose.Schema({
    id: String,
    name: String, 
    country: String, 
    coord: {
        lon: String, 
        lat: String
    }
});

module.exports = mongoose.model('City', citySchema);