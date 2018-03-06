'use strict';


var mongoose = require('mongoose'),
    Product = mongoose.model('Product');


exports.all_products = function(req, res) {
    Product.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.create_product = function(req, res) {
    var new_product = new Product(req.body);
    new_product.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_product = function(req, res) {
    Product.findById(req.params.productId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_product = function(req, res) {
    Product.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_product = function(req, res) {

    Product.remove({
        _id: req.params.productId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Product successfully deleted' });
    });
};