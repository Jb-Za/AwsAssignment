const PolicePost = require("../middleware/police");

module.exports = PolicePost;


console.log(policeDb);

const getDB = (req, res) => {

    var policeDb = PolicePost.find($`location:/${req}/`);
    return policeDb;
}

module.exports = {
    getDB
  };
   