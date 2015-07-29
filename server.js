var express                 = require('express'),
    mongoose                = require('mongoose'),
    favicon                 = require('serve-favicon'),
    //fs                      = require('fs'),
    bodyParser              = require('body-parser');

//var itemsModel              = require('./server/models/itemModel.js'),
//    itemController          = require('./server/controllers/itemController');
    //http                    = require('http').Server(app);


var db = mongoose.connect('mongodb://localhost/tellus');


app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(favicon(__dirname + '/client/images/favicon.ico'));

require('./server/models/itemModel.js');
require('./routes.js') (app);

app.use('/css', express.static(__dirname + '/client/css'));
app.use('/js', express.static(__dirname + '/client/js'));




//app.get('/api/items', itemController.list);

app.listen(3000, function(){
	console.log('listening on *:3000');
});
