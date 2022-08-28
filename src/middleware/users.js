var mongoose = require('mongoose');

const myconnection = mongoose.createConnection("mongodb://127.0.0.1:27017/users");
const myconnection2 = mongoose.createConnection("mongodb://127.0.0.1:27017/description");
//var userlogin = new myconnection.Schema

var userLoginSchema = new mongoose.Schema({
    email : {type:String, unique : true},
    password : {type : String}
});

var UserLogin = myconnection.model('userDetail', userLoginSchema);
/**
 * 
 * @param
 *  {const catagoriesSchema = new mongoose.Schema(
    {
        //children:       [crimesChildSchema,areaChildSchema,addressChildSchema]
        date: {type:Date},
        crimes: {type:String},
        area: {type:String},
        address: {type:String}
    }
);


var PolicePost = myconnection.model('policeCatagories', catagoriesSchema);
} req 
var newPolicPost = new PolicePost();
    newPolicPost.date = Date.now();
    newPolicPost.area = postLocation;
    newPolicPost.crimes = postCatagory;
    newPolicPost.address = postaddress;

    newPolicPost.save(function(err,savePost){});

    const filter = {};
    console.log(await PolicePost.find(filter) )
    userpost = new userPost();

userPost.save(function(err,savePost){}); * @param {*} res 
 */
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