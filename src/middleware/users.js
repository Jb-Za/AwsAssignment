var mongoose = require('mongoose');

const myconnection = mongoose.createConnection("mongodb://127.0.0.1:27017/users");

//var userlogin = new myconnection.Schema

var userLoginSchema = new mongoose.Schema({
    email : {type:String, unique : true},
    password : {type : String}
});

var UserLogin = myconnection.model('userDetail', userLoginSchema);

const textSchema = new mongoose.Schema(
    {
        //children:       [crimesChildSchema,areaChildSchema,addressChildSchema]
        date: {type:Date},
        email: {type:String},
        text: {type:String},
        
    }
  );
var textpost = myconnection2.model('TextPost', textSchema);
  
module.exports = textpost;
module.exports = UserLogin;