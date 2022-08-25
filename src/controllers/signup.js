const signup = require("../middleware/signup");

const getSignUp = async (req, res) => {
    var email = req.body.email;
        var password = req.body.pwd;

        // First creating salt.
        bcrypt.genSalt(10,function(err,salt){
            if(err){
                console.log(err);
                return res.status(500).send();
            }
            // creating hash...of password
            bcrypt.hash(password,salt,function(err,data){
                if(err){
                    console.log(err)
                    return res.status(500).send();
                }
                console.log(data); // This is hash of the password...
                //Creating model to save the user data in Database..
                var newuser = new UserLogin();
                newuser.email = email;
                newuser.password = data;

                // Inserting data to database...
                newuser.save(function(err,saveuser){
                    if(err) {
                        console.log(err);
                        if(err.code = 11000){
                            console.log('User Already Exist');
                            return res.status(500).send()
                        }
                        return res.status(500).send();
                    }
                    console.log('new user have benn save');
                    return res.status(200).send();
                });

            });

        });
    }