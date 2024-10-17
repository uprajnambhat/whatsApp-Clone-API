const express = require("express");
const router = express.Router();
const insertMessage = require("./controller/insertMessagesController.js");

router.post("/", insertMessage);
console.log("Reached insert message router");

module.exports = router;
