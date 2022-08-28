const upload = require("../middleware/upload");
const dbConfig = require("../config/db");

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
var mongoose = require('mongoose');
const url = dbConfig.url;

const baseUrl = "http://localhost:8080/files/";
const myconnection2 = mongoose.createConnection("mongodb://127.0.0.1:27017/description");

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
    var newtext = new textpost();
    newtext.date = Date.now();
   
    newtext.text = req.body.textinput;
    newtext.save(function(err,savePost){});

    console.log(req.files);
    console.log(req.body.textinput);

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




//////////////////////// aws comprehend testing
var textToTest = "I heard three gunshots and a loud crash, followed by a lot of shouting on madilyn steet, Bellville, Cape Town"

//const { ComprehendClient, BatchDetectDominantLanguageCommand } = require("@aws-sdk/client-comprehend");
/*
  const uploadFiles = async (req, res) => {
  // a client can be shared by different commands.

  const client = new ComprehendClient({ region: "us-east-1" });
  const textinput = req.body.textinput;
  const params = {
  textToTest
  };
  const command = new BatchDetectDominantLanguageCommand(params);

  // async/await.
  try {
  const data = await client.send(command);

  console.log(data)
  // process data.
  } catch (error) {
  // error handling.
  } finally {
  // finally.
  }


}

*/
/////////////////////// aws comprehend testing

module.exports = {
  uploadFiles,
  getListFiles,
  download,
};

