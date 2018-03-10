'use strict';


var mongoose = require('mongoose'),
    Preparator = mongoose.model('Preparator');


exports.all_preparators = function(req, res) {
    Preparator.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.create_preparator = function(req, res) {
    //var new_preparator = new Preparator(req.body);
    var new_preparator = new Preparator(req.body);
    new_preparator.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_preparator = function(req, res) {
    Preparator.findById(req.params.preparatorId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_preparator = function(req, res) {
    Preparator.findOneAndUpdate({_id: req.params.preparatorId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_preparator = function(req, res) {

    Preparator.remove({
        _id: req.params.preparatorId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Preparator successfully deleted' });
    });
};