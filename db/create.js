const getDb = require("./db.js");
const express = require("express");

const create = express();

const users = async () => {
  const db = await getDb();
  try {
    let results = [];
    let sql = `
    CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        username TEXT NOT NULL,
        email VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`;
    results = await db.execute(sql);
    return results;
  } catch (error) {
    console.error("Error creating users table: ", error);
  }
};
// Routes
create.get("/create-tables", async (req, res) => {
  try {
    const responseUsers = await users();
    res.send({ responseUsers });
  } catch (error) {
    console.error("Error creating tables: ", error);
  }
});
create.get("/create-table/users", async (req, res) => {
  const results = await users();
  res.send(results);
});

module.exports = { create };
