//const multer = require('multer');
//var UserLogin = require('./lib/mongoose_user');
//const GridFsStorage = require('multer-gridfs-storage');
//const Grid = require('gridfs-stream');
//const upload = require('./lib/mongoose_user');


const UserLogin = require("../middleware/users");

var mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');

module.exports = UserLogin;
var email = '';

const login = (req, res)  =>{
    email = req.body.email;
    var password = req.body.pwd;
  
    UserLogin.findOne({email:email},function(err,data){
        console.log(data);
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        
        if(!data){
            console.log("User doesn't exist")
            return res.status(404).send();
        }
  
        if (password == data.password) {
            return res.sendFile(path.join(`${__dirname}/../views/success.html`));
        }
        else {
            return res.status(500).send();
        }
    });
  
  };
  
  const getUserEmail = (res) =>{
    res = email;
    return res;
  }



  
  module.exports = {
    login,
    getUserEmail
  };