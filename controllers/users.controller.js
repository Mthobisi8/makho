const getDb = require("../db/db");

const getAll = async (req, res) => {
  console.log("heyyyy");

  const db = await getDb();
  try {
    const [results] = await db.execute("SELECT username, email FROM users");
    res.send(results);
  } catch (error) {
    console.error("Error getting users, ", error);
  }
};

module.exports = { getAll };
