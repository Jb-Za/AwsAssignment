var mongoose = require('mongoose');

const myconnection = mongoose.createConnection("mongodb://127.0.0.1:27017/police");

//const crimesChildSchema = new mongoose.Schema ({crimes: {type:String}});
//const areaChildSchema = new mongoose.Schema ({area: {type:String}});
//const addressChildSchema = new mongoose.Schema ({address: {type:String}});

const catagoriesSchema = new mongoose.Schema(
    {
        //children:       [crimesChildSchema,areaChildSchema,addressChildSchema]
        date: {type:Date},
        crimes: {type:String},
        area: {type:String},
        address: {type:String}
    }
);

var PolicePost = myconnection.model('policeCatagories', catagoriesSchema);

module.exports = PolicePost;