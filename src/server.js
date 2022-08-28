const cors = require("cors");
const express = require("express");
const app = express();
const initRoutes = require("./routes");

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 3000;


app.set('view engine', 'ejs')
//app.set('views','views')


app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});


