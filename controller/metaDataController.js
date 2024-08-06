const connection = require("../db");

const selectedUserDetails = (req, res) => {
  const { phoneNum, password } = req.body;
  console.log("reached metaDataDetails", phoneNum, password);
  const query = "SELECT * FROM metadata where phoneNum = ? AND password =?";

  connection.query(query, [phoneNum, password], (error, results) => {
    if (error) {
      console.error("Error executing query:", error.stack);
      res.status(500).send("Server Error");
      return;
    }
    console.log("Query results:", results);
    if (results.length === 0) {
      res.status(404).send("User not found");
      return;
    }

    res.json(results);
  });
};

module.exports = selectedUserDetails;
