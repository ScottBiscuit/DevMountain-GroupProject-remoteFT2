import express from "express";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import { User, Review, Tag, Image, WishlistItem } from "./src/model.js";
import { Op, Sequelize } from "sequelize";

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

//__________login, logout, register, and user info__________//

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

//__________Finding Reviews__________//

//find random review
app.get("/api/reviews", async (req, res) => {
  const review = Review.findAll({
    order: Sequelize.literal("rand()"),
    limit: 1,
  });
  res.json({ review });
});

//find most popular reviews
app.get("/api/reviews/popular", async (req, res) => {});

//find reviews from a certain user
app.get("/api/reviews/:userId", async (req, res) => {});

//find reviews based on the country
app.get("/api/reviews/:country", async (req, res) => {});

//find reviews based on the city
app.get("/api/reviews/:city", async (req, res) => {});

//find reviews based on tag
app.get("/api/reviews/:tagName", async (req, res) => {});

//view review and associated images
app.get("/api/images/:reviewId", async (req, res) => {});

//----------Creating, editing, and deleting---------//

//__________Reviews__________//

//create a review
app.post("/api/reviews", async (req, res) => {});

//edit a review
app.put("/api/reviews/:reviewId", async (req, res) => {});

//delete a review
app.delete("/api/reviews/:reviewId", async (req, res) => {});

//__________Images__________//

//link an image
app.post("/api/images", async (req, res) => {});

//delete an image
app.delete("/api/images/:imageId", async (req, res) => {});

//__________Wishlist__________//

//create a wishlist item
app.post("/api/wishlist", async (req, res) => {});

//view wishlist
app.get("/api/wishlist", async (req, res) => {});

//edit a wishlist item
app.put("/api/wishlist/:itemId", async (req, res) => {});

//delete a wishlist item
app.delete("/api/wishlist/:itemId", async (req, res) => {});

//link a review to a wishlist item
app.post("/api/wishlist/:reviewId", async (req, res) => {});

//remove a review from a wishlist item
app.delete("/api/wishlist/:reviewId", async (req, res) => {});

//__________Tags__________//

//create a tag
app.post("/api/tag/:reviewId", async (req, res) => {});

//delete a tag
app.delete("/api/tag/:tagId", async (req, res) => {});

//*********************************END API Endpoints*********************************//

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
