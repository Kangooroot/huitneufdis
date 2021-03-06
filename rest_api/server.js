var express = require('express'),
    app = express(),
    port = process.env.PORT || 3001,
    mongoose = require('mongoose'),
    Order = require('./api/models/orderModel'), // MODELS
    Preparator = require('./api/models/preparatorModel'),
    Product = require('./api/models/productModel'),
    Alert = require('./api/models/alertModel'),
    Group = require('./api/models/groupModel'),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/huitneufdis');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



require('./api/routes/orderRoutes')(app); //importing routes
require('./api/routes/preparatorRoutes')(app);
require('./api/routes/productRoutes')(app);
require('./api/routes/alertRoutes')(app);
require('./api/routes/groupRoutes')(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);