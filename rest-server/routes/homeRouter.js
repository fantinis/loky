var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Homes = require('../models/home.js');

var homesRouter = express.Router();
homesRouter.use(bodyParser.json());

homesRouter.route('/')
.get(function (req, res, next) {
    Homes.find({}, function (err, home) {
        if (err) throw err;
        res.json(home);
    });
})

.post(function (req, res, next) {
    Homes.create(req.body, function (err, home) {
        if (err) throw err;
        console.log('Home created!');
        var id = home._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the home with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Homes.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

homesRouter.route('/:homeId')
.get(function (req, res, next) {
    Homes.findById(req.params.homeId, function (err, home) {
        if (err) throw err;
        res.json(home);
    });
})

.put(function (req, res, next) {
    Homes.findByIdAndUpdate(req.params.homeId, {
        $set: req.body
    }, {
        new: true
    }, function (err, home) {
        if (err) throw err;
        res.json(home);
    });
})

.delete(function (req, res, next) {
    Homes.findByIdAndRemove(req.params.homeId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});
/*
hotSpotsRouter.route('/:hotspotId/sensorsData')
.get(function (req, res, next) {
    HotSpots.findById(req.params.hotspotId, function (err, hotspot) {
        if (err) throw err;
        res.json(hotspot.sensorsData);
    });
})

.post(function (req, res, next) {
    HotSpots.findById(req.params.hotspotId, function (err, hotspot) {
        if (err) throw err;
        hotspot.sensorsData.push(req.body);
        hotspot.save(function (err, hotspot) {
            if (err) throw err;
            console.log('Updated sensor data!');
            res.json(hotspot);
        });
    });
})

.delete(function (req, res, next) {
    hotspot.findById(req.params.hotspotId, function (err, hotspot) {
        if (err) throw err;
        for (var i = (hotspot.sensorsData.length - 1); i >= 0; i--) {
            hotspot.sensorsData.id(hotspot.sensorsData[i]._id).remove();
        }
        hotspot.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all data!');
        });
    });
});

dishRouter.route('/:dishId/comments/:commentId')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});
*/
module.exports = homesRouter;