'use strict';


var mongoose = require('mongoose'),
    Alert = mongoose.model('Alert');


exports.all_alerts = function(req, res) {
    /*Alert.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });*/
    Alert.find().populate("preparator").populate("product").exec(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.create_alert = function(req, res) {
    var new_alert = new Alert(req.body);
    new_alert.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_alert = function(req, res) {

    Alert.remove({
        _id: req.params.alertId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Alert successfully deleted' });
    });
};