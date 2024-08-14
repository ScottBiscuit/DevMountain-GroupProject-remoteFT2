import express from "express";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import {
  User,
  Review,
  Tag,
  Image,
  WishlistItem,
  WishlistReview,
} from "./src/model.js";
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
  res.json({ user: user });
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

//find random reviews *** fix find random code
app.get("/api/reviews/random/:limit", async (req, res) => {
  const { limit } = req.params;
  const reviews = await Review.findAll({
    order: Sequelize.literal("random()"),
    limit: limit,
  });
  res.json({ reviews });
});

//find most recently updated reviews
app.get("/api/reviews/recentUpdated/:limit", async (req, res) => {
  const { limit } = req.params;
  const reviews = await Review.findAll({
    order: [["updatedAt", "DESC"]],
    limit: limit,
  });
  res.json({ reviews });
});

//find most recently created reviews
app.get("/api/reviews/recentCreated/:limit", async (req, res) => {
  const { limit } = req.params;
  const reviews = await Review.findAll({
    order: [["createdAt", "DESC"]],
    limit: limit,
  });
  res.json({ reviews });
});

//find most popular reviews
app.get("/api/reviews/popular/:limit", async (req, res) => {
  const { limit } = req.params;
  const reviews = await Review.findAll({
    order: [["likeCount", "DESC"]],
    limit: limit,
  });
  res.json({ reviews });
});

//find reviews from a certain user
app.get("/api/reviews/:userId", async (req, res) => {
  const { userId } = req.params;
  const reviews = await Review.findAll({
    where: {
      userId: userId,
    },
    order: [["likeCount", "DESC"]],
  });
  res.json({ reviews });
});

//find reviews based on the country
app.post("/api/reviews/country", async (req, res) => {
  const { country } = req.body;
  const reviews = await Review.findAll({
    where: {
      country: country,
    },
    order: [["likeCount", "DESC"]],
  });
  res.json({ reviews });
});

//find reviews based on the city
app.post("/api/reviews/city", async (req, res) => {
  const { city } = req.body;
  const reviews = await Review.findAll({
    where: {
      city: city,
    },
    order: [["likeCount", "DESC"]],
  });
  res.json({ reviews });
});

//find reviews based on tag
app.post("/api/reviews/tagName", async (req, res) => {
  const { tagName } = req.body;
  const reviews = await Review.findAll({
    include: [
      {
        model: Tag,
        required: true,
        where: {
          tagName: tagName,
        },
      },
    ],
    order: [["likeCount", "DESC"]],
  });
  res.json({ reviews });
});

//find images associated with a review
app.get("/api/images/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const images = await Image.findAll({
    where: {
      reviewId: reviewId,
    },
    order: [["createdAt", "DESC"]],
  });
  res.json({ images });
});

//----------Creating, editing, and deleting---------//

//__________Reviews__________//

//create a review
app.post("/api/reviews", async (req, res) => {
  const { userId } = req.session;
  const { locationName, reviewContent, country, state, city, streetAddress } =
    req.body;
  const review = await Review.create({
    locationName: locationName,
    reviewContent: reviewContent,
    likeCount: 0,
    markReview: false,
    country: country,
    state: state,
    city: city,
    streetAdress: streetAddress,
    userId: userId,
  });
  res.json(review);
});

//edit a review content
app.put("/api/reviews/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const { reviewContent, locationName, country, state, city, streetAddress } =
    req.body;
  const review = await Review.findByPk(reviewId);

  review.locationName = locationName || review.locationName;
  review.reviewContent = reviewContent || review.reviewContent;
  review.country = country || review.country;
  review.state = state || review.state;
  review.city = city || review.city;
  review.streetAddress = streetAddress || review.streetAddress;
  await review.save();
  res.json(review);
});

//delete a review
app.delete("/api/reviews/:reviewId", async (req, res) => {
  const { userId } = req.session;
  const { reviewId } = req.params;
  const review = await Review.findByPk(reviewId);

  if (review.userId === userId) {
    await review.destroy();
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

//__________Images__________//

//post an image
app.post("/api/images/:reviewId", async (req, res) => {
  const { userId } = req.session;
  const { reviewId } = req.params;
  const { imageSrc, imageName, imageDesc } = req.body;
  const image = await Image.create({
    imageSrc: imageSrc,
    imageName: imageName,
    imageDesc: imageDesc,
    userId: userId,
    reviewId: reviewId,
  });
  res.json(image);
});

//delete an image
app.delete("/api/images/:imageId", async (req, res) => {
  const { userId } = req.session;
  const { imageId } = req.params;
  const image = await Image.findByPk(imageId);

  if (image.userId === userId) {
    await image.destroy();
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

//__________Wishlist__________//

//create a wishlist item
app.post("/api/wishlist", async (req, res) => {
  const { userId } = req.session;
  const { country, itemName, state, city, streetAddress } = req.body;

  const wishlistItem = await WishlistItem.create({
    country: country,
    itemName: itemName,
    state: state,
    city: city,
    streetAddress: streetAddress,
    userId: userId,
  });
  res.json(wishlistItem);
});

//view all wishlist items
app.get("/api/wishlist", async (req, res) => {
  const { userId } = req.session;

  const item = await WishlistItem.findAll({ where: { userId: userId } });
  res.json(item);
});

//edit a wishlist item
app.put("/api/wishlist/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const { country, itemName, state, city, streetAddress } = req.body;

  const wishlistItem = await WishlistItem.findByPk(itemId);
  wishlistItem.country = country || wishlistItem.country;
  wishlistItem.itemName = itemName || wishlistItem.itemName;
  wishlistItem.state = state || wishlistItem.state;
  wishlistItem.city = city || wishlistItem.city;
  wishlistItem.streetAddress = streetAddress || wishlistItem.streetAddress;
  await wishlistItem.save();
  res.json(wishlistItem);
});

//delete a wishlist item
app.delete("/api/wishlist/:itemId", async (req, res) => {
  const { userId } = req.session;
  const { itemId } = req.params;
  const item = await WishlistItem.findByPk(itemId);

  if (item.userId === userId) {
    await item.destroy();
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

//link a review to a wishlist item
app.post("/api/wishlist/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const { itemId } = req.body;
  const { userId } = req.session;

  const link = await WishlistReview.create({
    itemId: itemId,
    reviewId: reviewId,
    userId: userId,
  });
  res.json(link);
});

//remove a review from a wishlist item
app.delete("/api/wishlist/review/:wishId", async (req, res) => {
  const { userId } = req.session;
  const { wishId } = req.params;
  const wish = await WishlistReview.findByPk(wishId);

  if (wish.userId === userId) {
    await wish.destroy();
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

//__________Tags__________//

//create a tag
app.post("/api/tag/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const { tagName } = req.body;
  const { userId } = req.session;

  const link = await Tag.create({
    tagName: tagName,
    reviewId: reviewId,
    userId: userId,
  });
  res.json(link);
});

//delete a tag
app.delete("/api/tag/:tagId", async (req, res) => {
  const { userId } = req.session;
  const { tagId } = req.params;
  const tag = await Tag.findByPk(tagId);

  if (tag.userId === userId) {
    await tag.destroy();
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

//*********************************END API Endpoints*********************************//

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
