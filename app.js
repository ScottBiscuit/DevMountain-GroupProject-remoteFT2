import express from "express";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import {
  User,
  Review,
  WishlistItem,
  WishlistReview,
  Like,
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
    console.log(req.session);

    res.json({ success: true, userId: req.session.userId });
  } else {
    res.json({ success: false });
  }
});

//session user
app.get("/api/auth", async (req, res) => {
  const { userId } = req.session;
  const user = await User.findByPk(userId);
  console.log(user);
  res.json({ user: user });
});

//view user data
app.get("/api/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId);
  console.log(user);
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

//edit user bio
app.put("/api/user/editBio", async (req, res) => {
  const { bio } = req.body;
  const { userId } = req.session;
  const user = await User.findByPk(userId);
  user.bio = bio || user.bio;
  await user.save();
  res.json({ success: true });
});

//change password
app.put("/api/user/editPassword", async (req, res) => {
  const { password, password2, currentPassword } = req.body;
  const { userId } = req.session;
  const user = await User.findByPk(userId);
  if (currentPassword === user.password) {
    if (currentPassword !== password) {
      if (password === password2) {
        user.password = password || user.password;
        await user.save();
        console.log("success");
        res.json({ success: true });
      } else {
        res.json({
          success: false,
          error: "New password doesn't match in both fields",
        });
      }
    } else {
      res.json({
        success: false,
        error:
          "New password is the same as your current password. Please pick a different password.",
      });
    }
  } else {
    res.json({
      success: false,
      error:
        "Password entered doesn't match current password, check your spelling and try again. If you continue to have problems, please contact an administator to reset your password.",
    });
  }
});

//__________Finding Reviews__________//

//find all reviews
app.get("/api/reviews", async (req, res) => {
  const reviews = await Review.findAll();
  res.json({ reviews });
});

//find a review based on reviewId
app.get("/api/reviews/thisreview/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const reviews = await Review.findOne({
    where: { reviewId: reviewId },
  });
  res.json({ reviews });
});

//find random reviews *** fix find random code
app.get("/api/reviews/random/:limit", async (req, res) => {
  const { limit } = req.params;
  const reviewsRand = await Review.findAll({
    order: Sequelize.literal("random()"),
    limit: limit,
  });
  res.json({ reviewsRand });
});

//find most recently updated reviews
app.get("/api/reviews/recentUpdated/:limit", async (req, res) => {
  const { limit } = req.params;
  const reviewsRecUp = await Review.findAll({
    order: [["updatedAt", "DESC"]],
    limit: limit,
  });
  res.json({ reviewsRecUp });
});

//find most recently created reviews
app.get("/api/reviews/recentCreated/:limit", async (req, res) => {
  const { limit } = req.params;
  const reviewsRecCr = await Review.findAll({
    order: [["createdAt", "DESC"]],
    limit: limit,
  });
  res.json({ reviewsRecCr });
});

//find most popular reviews
app.get("/api/reviews/popular/:limit", async (req, res) => {
  const { limit } = req.params;
  const reviewsPop = await Review.findAll({
    order: [["likeCount", "DESC"]],
    limit: limit,
  });
  res.json({ reviewsPop });
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
  res.json(reviews);
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
  res.json(reviews);
});

//find reviews based on the state
app.post("/api/reviews/state", async (req, res) => {
  const { state } = req.body;
  const reviews = await Review.findAll({
    where: {
      state: state,
    },
    order: [["likeCount", "DESC"]],
  });
  res.json(reviews);
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
  res.json(reviews);
});

//check liked status
app.get("/api/like/:reviewId", async (req, res) => {
  const { userId } = req.session;
  const { reviewId } = req.params;
  const like = await Like.findOne({
    where: {
      userId: userId,
      reviewId: reviewId,
    },
  });
  console.log(like);

  if (like) {
    res.json({ status: true, likeId: like.likeId });
  } else {
    res.json({ status: false });
  }
});

//like a review
app.post("/api/like/:reviewId", async (req, res) => {
  const { userId } = req.session;
  const { reviewId } = req.params;
  // check for existing like
  const like = await Like.create({
    userId: userId,
    reviewId: reviewId,
  });
  res.json({ success: true, likeId: like.likeId });
});

//unlike a review
app.delete("/api/like/:likeId/delete", async (req, res) => {
  const { likeId } = req.params;
  const { userId } = req.session;
  const like = await Like.findOne({
    where: {
      likeId: likeId,
    },
  });
  if (userId === like.userId) {
    await like.destroy();
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

//increase like count
app.put("/api/reviews/:reviewId/like", async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findOne({
    where: {
      reviewId: reviewId,
    },
  });
  review.likeCount += 1;
  await review.save();
  res.json({ success: true });
});

//decrease like count
app.put("/api/reviews/:reviewId/unlike", async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findOne({
    where: {
      reviewId: reviewId,
    },
  });
  review.likeCount -= 1;
  await review.save();
  res.json({ success: true });
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

//view all wishlist reviews
app.get("/api/wishlist/reviews/:itemId", async (req, res) => {
  const { itemId } = req.params;

  const reviews = await Review.findAll({
    include: [
      {
        model: WishlistReview,
        required: true,
        where: {
          itemId: itemId,
        },
      },
    ],
  });

  res.json(reviews);
});

//remove a review from a wishlist item
app.delete(
  "/api/wishlist/reviews/:itemId/:reviewId/delete",
  async (req, res) => {
    const { userId } = req.session;
    const { itemId, reviewId } = req.params;
    const wishReview = await WishlistReview.findOne({
      where: {
        itemId: itemId,
        reviewId: reviewId,
      },
    });

    if (wishReview.userId === userId) {
      await wishReview.destroy();
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  }
);

//remove all reviews from a wishlist item and delete wishlist
app.delete("/api/wishlist/:itemId/delete", async (req, res) => {
  const { userId } = req.session;
  const { itemId } = req.params;
  const wish = await WishlistItem.findByPk(itemId);
  const wishReviews = await WishlistReview.findAll({
    where: {
      itemId: itemId,
    },
  });

  if (wish.userId === userId) {
    if (wishReviews.length > 0) {
      await wishReviews.destroy();
    }
    await wish.destroy();
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

//*********************************END API Endpoints*********************************//

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
