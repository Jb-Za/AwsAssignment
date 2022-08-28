const upload = require("../middleware/upload");
const dbConfig = require("../config/db");

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
var mongoose = require('mongoose');
const UserLogin = require("./login");
const url = dbConfig.url;
const email = require("./login")

const PolicePost = require("../middleware/police");
const myconnection = mongoose.createConnection("mongodb://127.0.0.1:27017/users");
const baseUrl = "http://localhost:8080/files/";
const myconnection2 = mongoose.createConnection("mongodb://127.0.0.1:27017/description");

const mongoClient = new MongoClient(url);


const textSchema = new mongoose.Schema(
  {
      //children:       [crimesChildSchema,areaChildSchema,addressChildSchema]
      date: {type:Date},
      email: {type:String, unique : true},
      text: {type:String},
      
  }
);
var textpost = myconnection2.model('TextPost', textSchema);   

const uploadFiles = async (req, res) => {
  try{
    await upload(req, res);
    var newtext = new textpost();
    newtext.date = Date.now();
    newtext.email = UserLogin.getUserEmail;
    newtext.text = req.body.textinput;
    newtext.save(function(err,savePost){});

    getTextCatagories(newtext.text);
    //console.log(req.files);
    //console.log(req.body.textinput);
    
    if (req.files.length <= 0) {
      return res
        
       .send({ message: "You must select at least 1 file." });
    }

    //return res.sendFile(path.join(`${__dirname}/../views/index.html`));
   
    return res.status(200).send({

      message: "Thank you for your submission, your files and report have been submitted.",
    });


  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        message: "Too many files to upload.",
      });
    }
    return res.status(500).send({
      message: `Error when trying upload many files: ${error}`,
    });
  }
};

//////////////////////// aws comprehend 
const ExampleText = "I heard three gunshots and a loud crash, followed by a lot of shouting on madilyn street, Bellville, Cape Town";


const AWS = require('aws-sdk');
AWS.config.region = ( process.env.AWS_REGION || 'us-east-1' );

const comprehend = new AWS.Comprehend();

const doComprehend = async (req, res) => {
  const Text = req
  const params = {
    LanguageCode: 'en',
    Text
  }

  res = await comprehend.detectEntities(params).promise();
  //console.log('doSentimentAnalysis: ', res)
  return res;
  
}

/////////////////////// aws comprehend 

const locations = [
  'Bellville',
  'Kuils River',
  'Stellenbosch',
  'Edgemead',
  'Table View',
  'Parow',
  'Athlone',
  'Elsies Rivier',
  'Epping',
  'Belhar',
  'Delft',
  'Brackenfell',
  'Mitchells Plain',
  'Philippi',
  'Claremont',
  'Muizenberg',
]

const catagories = [
  "gunshots",
  "hijackings",
  "robbings",
  "thefts",
  "burglaries",
  "arson",
  "fraud",
  "murders",
  "stalking",
  
]

module.exports = PolicePost;
module.exports = email;

const submitPost =  async (req, res) => {
  
  //var res2 = await getListFiles();
  //console.log(getListFiles());
  //console.log(res2);
  //var text = $(document).getElementsByName('text-input')[0].value                 ////fix
  //text = ExampleText;
  //console.log(email.getUserEmail());
  await getTextCatagories(req);
  await uploadFiles(req);
  //uploadFiles(req, result);

  //res = result;
  //return res;
}



const getTextCatagories = async (req) => {  // req will be the text from the text box
  sentiment_res = await doComprehend (req); 
  console.log(sentiment_res)

  for (const [key, value] of Object.entries(sentiment_res)) { 
    var postLocation, postaddress, postCatagory
    for(const i in value){
      index = locations.indexOf(value[i].Text);
      if(index >=0){
        //console.log(value[i].Text);             // location value
        postLocation = value[i].Text;
      }
      
      for(j in catagories){
        if(value[i].Text.includes(catagories[j])){
          //console.log(catagories[j]);          // catagories
          postCatagory = catagories[j];
        }
      }

      addressArray = ['street','avenue', 'ave', 'str', 'close', 'lane', 'square', 'highway', 'boulevard']
      testString = value[i].Text.toLowerCase()
      address = addressArray.some(w => testString.includes(w))
      if (address){
        //console.log(value[i].Text);           // street address
        postaddress = value[i].Text;
      }
    
    }
    
    var newPolicPost = new PolicePost();
    newPolicPost.date = Date.now();
    newPolicPost.area = postLocation;
    newPolicPost.crimes = postCatagory;
    newPolicPost.address = postaddress;

    newPolicPost.save(function(err,savePost){});

    const filter = {};
    console.log(await PolicePost.find(filter) )

  }
}
/*
const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }

    return res.status(200).send({
      message: "Files have been uploaded.",
    });

  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        message: "Too many files to upload.",
      });
    }
    return res.status(500).send({
      message: `Error when trying upload many files: ${error}`,
    });
  }
};

*/

module.exports = {
  uploadFiles,
  //getListFiles,
  //download,
  submitPost
};
