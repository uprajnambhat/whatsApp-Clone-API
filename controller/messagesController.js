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

module.exports = selectedChat;
