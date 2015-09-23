module.exports = function(app) {
    var items = require('./server/controllers/itemController.js');

    app.get('/items', items.findAll);
    app.get('/items:id', items.findById);
    app.post('/items:id', items.add);
    app.put('/items/:id', items.update);
    app.delete('/items/:id', items.delete); 

    app.get('/', function(req, res){
        res.sendFile(__dirname + '/client/views/index.html');
    });
};