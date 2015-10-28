var express                 = require('express'),
    session                 = require('express-session'),
    mongoose                = require('mongoose'),
    MongoStore              = require('connect-mongo')(session),
    cookieParser            = require('cookie-parser');
    //fs                      = require('fs'),
    bodyParser              = require('body-parser');

//var itemsModel              = require('./server/models/itemModel.js'),
//    itemController          = require('./server/controllers/itemController');
    //http                    = require('http').Server(app);

var config = require(__dirname + '/config/config.js');
var db = mongoose.connect(config.url || 'mongodb://localhost/tellus');


app = express();

app.use(session({
    collection: 'sessions',
    resave: false,
    saveUninitialized: true,
    secret: config.session_secret,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    stringify: true,
    ttl: 2*24*60*60, //1 day before expiration
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

require('./server/models/itemModel.js');

require('./routes.js') (app);

app.use('/bower', express.static(__dirname + '/bower_components'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/images', express.static(__dirname + '/client/images'));
app.use('/js', express.static(__dirname + '/client/js'));




//app.get('/api/items', itemController.list);

app.listen(3000, function(){
	console.log('listening on *:3000');
});
