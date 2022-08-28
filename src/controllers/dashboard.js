const PolicePost = require("../middleware/police");
const { getDashBoard } = require("./home");

module.exports = PolicePost;

const getDB = async (req, res) => {
    var policeDb = await PolicePost.find({}).exec();

    //console.log(policeDb);
    res.json({'policeDb': policeDb})
    //res.render('index', );
}

const getNumCrimes = async (req, res) => {
    var policeDb = await PolicePost.find({}).exec()
    res.json({'policeDb': policeDb})
}

const getAreaCrimes = async (req, res) => {
    var policeDb = await PolicePost.find({}).exec()
    res.json({'policeDb': policeDb})
}



module.exports = {
    getDB,
    getNumCrimes,
    getAreaCrimes
  };
   