'use strict';

module.exports = function(app) {

    var order = require('../controllers/orderController');

    app.route('/order')
        .get(order.all_orders)
        .post(order.create_order);

    app.route('/order/:orderId')
        .get(order.read_order)
        .put(order.update_order)
        .delete(order.delete_order);
};