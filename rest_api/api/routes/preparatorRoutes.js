'use strict';

module.exports = function(app) {

    var preparator = require('../controllers/preparatorController');

    app.route('/preparator')
        .get(preparator.all_preparators)
        .post(preparator.create_preparator);

    app.route('/preparator/:preparatorId')
        .get(preparator.read_preparator)
        .put(preparator.update_preparator)
        .delete(preparator.delete_preparator);
};