const express = require("express");
const app = express();
const cors = require("cors");
const metaDataRouter = require("./metaData.js");
const messagesRouter = require("./messages.js");
app.use(cors());
app.use(express.json());
app.use("/api/user", metaDataRouter);
app.use("/api/user/chats", messagesRouter);

app.listen(3004, () => {
  console.log("Server running on port 3004");
});
