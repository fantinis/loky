var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var SensorDatas = require('../models/sensorData.js');
var Verify = require('./verify');

var sensorDatasRouter = express.Router();
sensorDatasRouter.use(bodyParser.json());

sensorDatasRouter.route('/')
.get(function (req, res, next) {
    SensorDatas.find({}, function (err, sensorData) {
        if (err) throw err;
        res.json(sensorData);
    });
})

.post(function (req, res, next) {
    SensorDatas.create(req.body, function (err, sensorData) {
        if (err) throw err;
        console.log('SensorData created!');
        var id = sensorData._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Sensor Data added with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    SensorDatas.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

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