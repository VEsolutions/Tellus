module.exports = function(app) {
    var items = require('./server/controllers/itemController.js');
    var comments = require('./server/controllers/commentController.js');

    app.get('/items', items.findAll);
    app.get('/items/:id', items.findById);
    app.post('/items', items.add);
    app.put('/items/:id', items.update);
    //app.delete('/items/:id', items.delete); 

    app.get('/comments', comments.findAll);
    app.get('/comments/:id', comments.findById);
    app.post('/comments', comments.add);
    app.put('/comments/:id', comments.update);
    //app.delete('/items/:id', items.delete); 

    app.get('/', function(req, res){
        //res.setHeader('httpOnly','false');
        res.sendFile(__dirname + '/client/views/index.html');
    });
};