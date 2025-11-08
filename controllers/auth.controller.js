const getDb = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const db = await getDb();
  try {
    const [existing] = await db.execute(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );
    console.log(existing);
    if (existing.length > 0) {
      return res
        .status(400)
        .send({ error: true, message: "Username already exists" });
    }

    await db.execute(
      "INSERT INTO users (username, email, password) VALUES (?,?,?)",
      [username, email, hashed]
    );

    res.send({
      error: false,
      message: `User '${username}' registered successfully`,
    });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.send({ error: true, message: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const db = await getDb();

  try {
    let [user] = await db.execute("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    user = user[0];
    if (!user)
      return res.send({ error: true, message: `User '${username}' not found` });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).send({ error: true, message: "Invalid password" });
    jwt;
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).send({ error: false, token, message: "Logging in" });
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).send({ error: true, message: "Server error" });
  }
};

const isUser = async (req, res) => {
  const auth = req.headers.authorization;
  
  const token = auth.split(" ")[1];
  
  if (token === "null") return res.status(401).send({ error: true, message: "Missing token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).send({error: false, message: "User is logged in"})
  } catch (error) {
    res.status(401).json({error: false, message: 'Invalid token' });
  }
};

module.exports = { register, login, isUser };
