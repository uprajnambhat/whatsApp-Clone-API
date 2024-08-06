const express = require("express");
const router = express.Router();
const selectedUserDetails = require("./controller/metaDataController.js");

router.post("/", selectedUserDetails);
console.log("REACHED ROUTER");
module.exports = router;
