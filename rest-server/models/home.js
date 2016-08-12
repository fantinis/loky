// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var homeSchema = new Schema({
    name:  {
        type: String,        
        required: true
    },
    dascription:  {
        type: String,        
        required: true
    },
    
}, {
    timestamps: true
});


// the schema is useless so far
// we need to create a model using it
var homes = mongoose.model('Home', homeSchema);

// make this available to our Node applications
module.exports = homes;