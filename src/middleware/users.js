var mongoose = require('mongoose');

const myconnection = mongoose.createConnection("mongodb://127.0.0.1:27017/users");

var userLoginSchema = new mongoose.Schema({
    email : {type:String, unique : true},
    password : {type : String}
});

var UserLogin = myconnection.model('userDetail', userLoginSchema);

module.exports = UserLogin;