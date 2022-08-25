const path = require("path");

const home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/signup.html`));
};

module.exports = {
  getHome: home
};


    