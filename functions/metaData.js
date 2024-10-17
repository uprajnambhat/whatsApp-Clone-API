const express = require("express");
const router = express.Router();
const {
  selectedUserDetails,
  signUpUser,
} = require("./controller/metaDataController.js");

router.post("/", selectedUserDetails);
router.post("/signUp", signUpUser);
console.log("REACHED ROUTER");
module.exports = router;
