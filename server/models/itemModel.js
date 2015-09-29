var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: {type:String, trim:true},
    description: {type:String, trim:true},
    yum: {type:Number, default:0},
    date: {type:Date, default:Date.now},
    imgurl: {type:String, trim:true}
});

//module.exports = 
mongoose.model('items', ItemSchema);