// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sensorDataSchema = new Schema({
    ip:  {
        type: String,        
        required: true
    },
    uid:  {
        type: String,        
        required: true
    },
    name:  {
        type: String,        
        required: true
    },
    sw:  {
        type: Number,        
        required: true
    },
    vdd:  {
        type: Number,        
        required: true
    },
    cpuTemp:  {
        type: Number,        
        required: true
    },
    accTemp:  {
        type: Number,        
        required: true
    },
    accDataX:  {
        type: Number,        
        required: true
    },
    accDataY:  {
        type: Number,        
        required: true
    },
    accDataZ:  {
        type: Number,        
        required: true
    },
    WakeUp:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// create a schema
var hotSpotSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    uid:  {
        type: String,        
        required: true
    },
    sensorsData:[sensorDataSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var hotSposts = mongoose.model('HotSpot', hotSpotSchema);

// make this available to our Node applications
module.exports = hotSposts;