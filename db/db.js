const mysql = require("mysql2/promise");

const getDb = async () => {
  try {
    const initialConnection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.EMAIL_PASSWORD,
    });
    await initialConnection.query("CREATE DATABASE IF NOT EXISTS makhomconstruction");
    console.log("Database 'makhomconstruction' is ready or already exists.");

    await initialConnection.end();

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.EMAIL_PASSWORD,
      database: "makhomconstruction",
    });
    console.log("Connected to MySQL database");
    return db;
  } catch (err) {
    console.error("Error initializing database:", err.message);
    throw err;
  }
};

module.exports = getDb;
