const connection = require("../db");

const selectedChat = (req, res) => {
  const { from_phone, to_phone } = req.query;
  console.log(req.query);
  const query = `SELECT * FROM messages 
    WHERE (from_phone = ? AND to_phone = ?) OR (from_phone = ? AND to_phone = ?)
    ORDER BY time ASC`;

  connection.query(
    query,
    [from_phone, to_phone, to_phone, from_phone],
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

      res.json(results);
    }
  );
};

const updateContactList = (req, res) => {
  const { phoneNo, contactList } = req.body;
  console.log(req.body);
  const contactListString = JSON.stringify(contactList);

  const query = `
    UPDATE metadata
    SET contactList = ?
    WHERE phoneNum = ?
  `;

  connection.query(query, [contactListString, phoneNo], (error, response) => {
    if (error) {
      console.error("Error executing query:", error.stack);
      res.status(500).send("Server Error");
      return;
    }
    console.log("Query results:", response);
    if (response.length === 0) {
      res.status(404).send("User not found");
      return;
    }
    const selectedUserQuery = "select * from metadata where phoneNum=?";

    connection.query(selectedUserQuery, [phoneNo], (error, results) => {
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

      console.log(results);
      res.json(results);
    });
  });
};

module.exports = { selectedChat, updateContactList };
