const express = require("express");
const router = express.Router();
const {
  selectedChat,
  updateContactList,
} = require("./controller/messagesController");

router.get("/", selectedChat);
router.put("/updateContactList", updateContactList);

console.log("reached message router");

module.exports = router;
