var express                 = require('express'),
    app                     = express(),
    http                    = require('http').Server(app);

app.use('/css', express.static(__dirname + '/client/css'));
app.use('/js', express.static(__dirname + '/client/js'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/views/index.html');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
})