'use strict';

module.exports = function(app) {

    var product = require('../controllers/productController');

    app.route('/product')
        .get(product.all_products)
        .post(product.create_product);

    app.route('/product/:productId')
        .get(product.read_product)
        .put(product.update_product)
        .delete(product.delete_product);
};