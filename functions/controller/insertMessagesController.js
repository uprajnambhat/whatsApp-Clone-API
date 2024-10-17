const connection = require("../db");

const insertMessage = (req, res) => {
  const { from_phone, to_phone, message, time } = req.body;

  const query = `INSERT INTO messages (from_phone, to_phone, message, time) VALUES (?, ?, ?, ?)`;

  connection.query(
    query,
    [from_phone, to_phone, message, time],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error.stack);
        res.status(500).send("Server Error");
        return;
      }
      const successQuery =
        "SELECT * FROM messages where from_phone = ? AND to_phone =?";
      connection.query(
        successQuery,
        [from_phone, to_phone],
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
    }
  );
};

module.exports = insertMessage;
