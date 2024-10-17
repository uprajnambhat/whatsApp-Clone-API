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

const signUpUser = (req, res) => {
  const { name, phoneNum, password, contactList = [] } = req.body;
  console.log("reached metaDataDetails", name, phoneNum, password, contactList);
  const contactListString = JSON.stringify(contactList);

  const query =
    "INSERT into  metadata (name, phoneNum, password, contactList) VALUES (?, ?, ?, ?)";

  connection.query(
    query,
    [name, phoneNum, password, contactListString],
    (error, results) => {
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
      const successQuery =
        "SELECT * FROM metadata where phoneNum = ? AND password =?";
      connection.query(successQuery, [phoneNum, password], (error, results) => {
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
      // res.json("User added successfully");
    }
  );
};

module.exports = { selectedUserDetails, signUpUser };
