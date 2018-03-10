'use strict';

module.exports = function(app) {

    var product = require('../controllers/alertController');

    app.route('/alert')
        .get(product.all_products)
        .post(product.create_product);

    app.route('/alert/:alertId')
        .delete(product.delete_product);
};