var mongoose = require('mongoose');
Item = mongoose.model('items');
var http = require('http');

exports.findAll = function(req, res) {
    Item.find({}, function(err, results) {
        return res.send(results);
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    Item.findOne({'_id':id}, function(err, result) {
        return res.send(result);
    });
};

exports.add = function(req, res) {
    var item = new Item();
    item.name = req.body.name;
    item.description = req.body.description;
    item.imgurl = "";
    item.yum = 0;

    function save(){
        //console.log("saved");
        item.save(function (err) {
            if (err) {
                return console.log(err);
            }
            return res.send(item.name + " description:" + item.description);
        });
    }

    var searchWord = item.name;
    var body = "";

    http.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + searchWord, function(res) {
        console.log("Got response: " + res.statusCode);
        res.on('data', function(d) {
            body += d;
        });

        res.on('end', function() {
            var parsed = JSON.parse(body);
            var data = parsed["data"];
            console.log(data);
            item.imgurl = data["image_url"];
            console.log(item.imgurl);
            save();
        });

    }, save).on('error', function(e, save) {
        console.log("Got error: " + e.message);
        save();
    });
    
};

exports.update = function(req, res) {
    var id = req.params.id;
    var updates = req.body;

    Item.update({'_id':id}, req.body, function(err, numbersAffected) {
        if (err) {
            return console.log(err);
        }
        console.log('Updated %d items', numbersAffected);
        return res.send(202);
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;
    Item.remove({'_id':id}, function(result) {
        return res.send(result);
    });
};








// var Item = require('mongoose').model('items');

// exports.create = function(req, res, next) {
//     var item = new Item(req, body);
//     item.save(function(err) {
//         if (err) {
//             return next(err);
//         }
//         else {
//             res.json(user);
//         }
//     });
// };

// exports.list = function(req, res, next) {
//     Item.find({}, function(err, items) {
//         if (err) {
//             return next(err);
//         }
//         else {
//             console.log('Got a request for a list');
//             res.json(items);
//         }
//     });
// };