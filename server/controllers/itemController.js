var mongoose = require('mongoose');
Item = mongoose.model('items');
var http = require('http');
cookieParser = require('cookie-parser');

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
    item.yum = 0;
    item.imgurl = req.body.imgurl;
    //console.log(req.body);

    item.save(function (err, createdItem) {
        if (err) {
            return console.log(err);
        }
        console.log(createdItem);
        return res.send(createdItem);
    });
};

exports.update = function(req, res) {
    var objectId = req.params.id;
    var updateNum = req.body.number;
    console.log(objectId);
    //console.log(req.params.id + updateNum);

    Item.findOne({'_id':objectId}, function(err, item) {
        if (err) {
            res.send(err);
        }
        //console.log("Got this: " + item);
        // Update the existing quantity
        item.yum = item.yum + updateNum; //req.body.quantity;

        //console.log("yums: " + item.yum);
        // Save the item and check for errors
        item.save(function(err) {
            if (err) {
                res.send(err);
            }
            console.log(req.cookies);
            if(req.session['votes']) {
                console.log(req.session['votes']);

                req.session['votes'] = req.session['votes'] + ', ' + objectId;
                res.cookie('allVotes', req.session['votes'], { maxAge: 14*24*60*60*1000, httpOnly: false });
            } else {
                req.session['votes'] = objectId;
                res.cookie('allVotes', req.session['votes'], { maxAge: 14*24*60*60*1000, httpOnly: false });
            }
            res.json(item);
        });
    });
    /*Item.update({'_id':id}, { $inc: { yum: updateNum} }, function(err, numbersAffected) {
        if (err) {
            return console.log(err);
        }
        console.log('Updated %d items', numbersAffected);
        return res.send(202);
    });*/
};



// If we want to delete when vote == -5.
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