import express from "express";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import { User, Review, Tag, Image, WishlistItem } from "./src/model.js";
import { Op } from "sequelize";

const app = express();
const port = 8000;

app.use(morgan("dev"));
app.use(express.urlencoded({ extend: false }));
app.use(express.json());
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);

ViteExpress.config({ printViteDevServerHost: true });

function loginRequired(req, res, next) {
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
}

//*********************************START API Endpoints*********************************//

//login
app.post("/api/auth", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email: email },
  });
  if (user && user.password === password) {
    req.session.userId = user.userId;
    res.json({ success: true, userId: req.session.userId });
  } else {
    res.json({ success: false });
  }
});

//session user
app.get("/api/auth", async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findByPk(userId);
  const { username } = user;
  res.json({ userId: userId, username: username });
});

//logout
app.post("/api/logout", loginRequired, (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

//create new user
app.post("/api/user", async (req, res) => {
  const { username, email, password } = req.body;

  const userEmail = await User.findOne({
    where: { email: email },
  });

  const userUsername = await User.findOne({
    where: { username: username },
  });

  if (!userEmail && !userUsername) {
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });
    res.json(user);
  } else if (userEmail) {
    res.json({ error: "Email already in use." });
  } else {
    res.json({ error: "Username already in use." });
  }
});

//get random review
app.get("/api/reviews", async (req,res) => {
  const review =
});

//*********************************END API Endpoints*********************************//

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
