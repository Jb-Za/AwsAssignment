const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const loginController = require("../controllers/login");


let routes = app => {
  router.get("/", homeController.getHome);
  router.post("/login", loginController.login);
  router.post("/upload", uploadController.uploadFiles);
  router.get("/files", uploadController.getListFiles);
  router.get("/files/:name", uploadController.download);
  router.get("/signup" ,signupController.signupRender );
  router.post("/signup" , signupController.getSignUp);  

  return app.use("/", router);
};

module.exports = routes;

