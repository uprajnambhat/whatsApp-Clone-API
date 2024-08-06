const express = require("express");
const router = express.Router();
const selectedChat = require("./controller/messagesController");

router.get("/", selectedChat);
console.log("reached message router");
module.exports = router;
