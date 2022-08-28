
const path = require('path');

const home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/index.html`));
};

const dashboard = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/dashboard.html`));
};

module.exports = {
  getHome: home,
  getDashBoard : dashboard
};
 

    