var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var SensorDatas = require('../models/sensorData.js');
var Verify = require('./verify');

var sensorDatasRouter = express.Router();
sensorDatasRouter.use(bodyParser.json());

sensorDatasRouter.route('/')
.get(function (req, res, next) {
    SensorDatas.find().sort({LastSeen:'asc'}).exec(function (err, sensorData) {
        if (err) throw err;
        res.json(sensorData);
    });
})
// il post viene fatto direttamente dal PHP
/*.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    SensorDatas.create(req.body, function (err, sensorData) {
        if (err) throw err;
        console.log('SensorData created!');
        var id = sensorData._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Sensor Data added with id: ' + id);
    });
})*/

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    SensorDatas.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});


//API retrive all Sensor Name and UID
sensorDatasRouter.route('/sensorsinfo/')
.get(function (req, res, next) {
    SensorDatas.aggregate(
    [
        { $sort: { UID: 1, LastSeen: 1 } },
        {
        $group:
            {
                _id: "$UID",
                LastSeen: { $last: "$LastSeen" },
                Name: { $last: "$Name" },
                Vdd: { $last: "$Vdd" },
                CpuTemp: { $last: "$CpuTemp" },
                AccTemp: { $last: "$AccTemp" },
                WakeUp: { $last: "$WakeUp" },
                AccDataX: { $last: "$AccDataX" },
                AccDataY: { $last: "$AccDataY" },
                AccDataZ: { $last: "$AccDataZ" }
            }
        }
    ], function (err, hotSpot) {
            if (err) throw err;
            res.json(hotSpot);
        });
})

//API retrive all Sensor Name and UID
sensorDatasRouter.route('/sensors/')
.get(function (req, res, next) {
    SensorDatas.aggregate([
        // Grouping pipeline
        { "$project": {"UID": { $toUpper: "$UID" }}},
        { $group : { _id : "$UID" } }
        
    ], function (err, hotSpot) {
        if (err) throw err;
        res.json(hotSpot);
    });
})

//API retrive all info regardinf one sensor
sensorDatasRouter.route('/:UID')
.get(function (req, res, next) {
    SensorDatas.find({'UID': req.params.UID}, function (err, hotSpot) {
        if (err) throw err;
        res.json(hotSpot);        
    });
})

//API retrive only the temperature info regerding one sensor
sensorDatasRouter.route('/temperature/:UID')
.get(function (req, res, next) {
    SensorDatas.find({'UID': req.params.UID}, 
    {'LastSeen': 1, 'CpuTemp': 1, 'AccTemp': 1, '_id': 0},

    function (err, hotSpot) {
        if (err) throw err;
        res.json(hotSpot);
    });
})

//API retrive only battery info regerding one sensor
sensorDatasRouter.route('/battery/:UID')
.get(function (req, res, next) {
    SensorDatas.find({'UID': req.params.UID}, {'LastSeen': 1, 'Vdd': 1, '_id': 0}, 
    function (err, hotSpot) {
        if (err) throw err;
        res.json(hotSpot);
    });
})

//API retrive only acceleration info regerding one sensor
sensorDatasRouter.route('/acceleration/:UID')
.get(function (req, res, next) {
    SensorDatas.find({'UID': req.params.UID}, 
    {'LastSeen': 1, 'AccDataX': 1, 'AccDataY': 1, 'AccDataZ': 1, '_id': 0}, 
    function (err, hotSpot) {
        if (err) throw err;
        res.json(hotSpot);
    });
})
//TODO
//get all sensor data referred to  the hotspot ID
sensorDatasRouter.route('/:hotspotId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    SensorDatas.findById(req.params.hotspotId, function (err, sensorData) {
        if (err) throw err;
        res.json(sensorData);
    });
})

//TODO
//put  sensor data referred to  the hotspot ID
.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    SensorDatas.findByIdAndUpdate(req.params.hotspotId, {
        $set: req.body
    }, {
        new: true
    }, function (err, hotspot) {
        if (err) throw err;
        res.json(sensorData);
    });
})


.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    SensorDatas.findByIdAndRemove(req.params.hotspotId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});


module.exports = sensorDatasRouter;