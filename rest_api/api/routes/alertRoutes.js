'use strict';

module.exports = function(app) {

    var alert = require('../controllers/alertController');

    app.route('/alert')
        .get(alert.all_alerts)
        .post(alert.create_alert);

    app.route('/alert/:alertId')
        .delete(alert.delete_alert);
};