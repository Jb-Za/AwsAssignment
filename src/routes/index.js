const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const loginController = require("../controllers/login");
const signupController = require("../controllers/signup");
const downloadController = require("../controllers/upload");
const dashboardController = require("../controllers/dashboard");


let routes = app => {
  router.get("/", homeController.getHome);
  router.post("/login", loginController.login);
  router.post("/upload", uploadController.uploadFiles);
  //router.get("/files", uploadController.getListFiles);
  router.get("/files/:name", uploadController.download);
  router.get("/signup" ,signupController.signup );
  router.post("/getsignup" , signupController.getSignUp);  
  router.get("/getFiles" ,uploadController.getListFiles);
  router.get("/dashboard" , homeController.getDashBoard);
  router.get("/getDb" , dashboardController.getDB)
  return app.use("/", router);
};

module.exports = routes;

