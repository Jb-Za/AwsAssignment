const UserLogin = require("../middleware/users");

var bcrypt = require('bcrypt');

const getSignUp = async (req, res) => {
    var email = req.body.email;
    var password = req.body.pwd;

    
    bcrypt.genSalt(10,function(err,salt){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        var newuser = new UserLogin();
        newuser.email = email;
        newuser.password = password;

        newuser.save(function(err,saveuser){
            if(err) {
                console.log(err);
                if(err.code = 11000){
                    console.log('User Already Exist');
                    return res.status(500).send()
                }
                return res.status(500).send();
            }
            console.log('new user has been saved');
            return res.status(200).send();
        });
    
        });
    }

const signupRender = async (req, res) => {
    res.render('signup');
}
module.exports = {
    getSignUp,
    signupRender
};
  