const upload = require("../middleware/upload");
const dbConfig = require("../config/db");
const PolicePost = require("../middleware/police");

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const url = dbConfig.url;

const baseUrl = "http://localhost:8080/files/";

const mongoClient = new MongoClient(url);


const textSchema = new mongoose.Schema(
  {
      //children:       [crimesChildSchema,areaChildSchema,addressChildSchema]
      date: {type:Date},
      email: {type:String},
      text: {type:String},
      
  }
);
var textpost = myconnection2.model('TextPost', textSchema);   

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }

    // return res.status(200).send({
    //   message: "Files have been uploaded.",
    // });

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

const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(dbConfig.database);
    const images = database.collection(dbConfig.imgBucket + ".files");

    const cursor = images.find({});

    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const download = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(dbConfig.database);
    const bucket = new GridFSBucket(database, {
      bucketName: dbConfig.imgBucket,
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

//////////////////////// aws comprehend 
const ExampleText = "I heard three gunshots and a loud crash, followed by a lot of shouting on madilyn street, Bellville, Cape Town";


const AWS = require('aws-sdk');
AWS.config.region = ( process.env.AWS_REGION || 'us-east-1' );


const comprehend = new AWS.Comprehend();

//////////////////////// aws comprehend testing

var textToTest = "I heard three gunshots and a loud crash, followed by a lot of shouting on madilyn steet, Bellville, Cape Town"

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
  "hijacking",
  "robbery",
  "theft",
  "burglary",
  "arson",
  "fraud",
  "murder",
  "stalking",
  
]
const submitPost =  async (req, res) => {
  
  //var text = $(document).getElementsByName('text-input')[0].value                 ////fix
  text = ExampleText;
  console.log(text);
  getTextCatagories(text);
  
  //uploadFiles(req, result);

  //res = result;
  //return res;
}

module.exports = PolicePost;

const getTextCatagories = async (req) => {  // req will be the text from the text box
  sentiment_res = await doComprehend (req); 
  console.log(sentiment_res)

  for (const [key, value] of Object.entries(sentiment_res)) { 
    var postLocation, postaddress, postCatagory
    for(const i in value){
      index = locations.indexOf(value[i].Text);
      if(index >=0){
        console.log(value[i].Text);             // location value
        postLocation = value[i].Text;
      }
      
      for(j in catagories){
        if(value[i].Text.includes(catagories[j])){
          console.log(catagories[j]);          // catagories
          postCatagory = catagories[j];
        }
      }

      addressArray = ['street','avenue', 'ave', 'str', 'close', 'lane', 'square', 'highway', 'boulevard']
      testString = value[i].Text.toLowerCase()
      address = addressArray.some(w => testString.includes(w))
      if (address){
        console.log(value[i].Text);           // street address
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

// const Text = "I heard three gunshots and a loud crash, followed by a lot of shouting on madilyn street, Bellville, Cape Town"


// const AWS = require('aws-sdk')
// AWS.config.region = ( process.env.AWS_REGION || 'us-east-1' )

// const comprehend = new AWS.Comprehend()

// const uploadFiles = async (req) => {
//     const Text = "It is raining today in Seattle"
//     const params = {
//       LanguageCode: 'en',
//       Text
//     }

//     const result = await comprehend.detectEntities(params).promise()
//     console.log('doSentimentAnalysis: ', result)
//     return result
  
// }



/////////////////////// aws comprehend testing


module.exports = {
  uploadFiles,
  getListFiles,
  download,
  submitPost
};

