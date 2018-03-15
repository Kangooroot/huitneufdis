'use strict';

module.exports = function(app) {

    var group = require('../controllers/groupController');

    app.route('/group')
        .get(group.all_groups);

    app.route('/group/:id')
        .get(group.create_group)
        .delete(group.delete_group);
};