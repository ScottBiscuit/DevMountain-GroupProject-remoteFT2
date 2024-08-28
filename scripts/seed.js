import {
  User,
  Review,
  WishlistItem,
  WishlistReview,
  db,
} from "../src/model.js";
import reviewData from "./data/reviews.json" assert { type: "json" };
import wishlistData from "./data/wishlists.json" assert { type: "json" };
import wishlistLinkData from "./data/wishlistLinks.json" assert { type: "json" };

console.log("syncing database...");
await db.sync({ force: true });

console.log("Seeding database...");

const usersToCreate = [];
for (let i = 1; i < 3; i++) {
  const email = `user${i}@test.com`;
  usersToCreate.push(
    User.create({
      username: `johndoe${i}`,
      email,
      password: "test",
      bio: "Hey there! I’m John Doe, a passionate globetrotter with a never-ending curiosity for the world. From the bustling streets of Tokyo to the serene landscapes of Patagonia, I share my adventures, travel tips, and cultural insights on this blog. When I’m not exploring new destinations, you can find me planning my next journey, savoring local cuisine, or getting lost in a good book. Join me as I navigate the world one adventure at a time!",
    })
  );
}

const usersInDB = await Promise.all(usersToCreate);

const reviewsInDb = await Promise.all(
  reviewData.map((review) => {
    const {
      locationName,
      reviewContent,
      country,
      state,
      city,
      userId,
      likeCount,
      image,
    } = review;
    const newReview = Review.create({
      locationName: locationName,
      reviewContent: reviewContent,
      country: country,
      state: state,
      city: city,
      userId: userId,
      likeCount: likeCount,
      image: image,
    });
    return newReview;
  })
);

const wishlistsInDb = await Promise.all(
  wishlistData.map((wishlist) => {
    const { itemName, country, state, city, userId } = wishlist;
    const newWishlist = WishlistItem.create({
      itemName: itemName,
      country: country,
      state: state,
      city: city,
      userId: userId,
    });
    return newWishlist;
  })
);

const wishlistLinksInDb = await Promise.all(
  wishlistLinkData.map((reviewLink) => {
    const { itemId, reviewId } = reviewLink;
    const newWishlistLink = WishlistReview.create({
      itemId: itemId,
      reviewId: reviewId,
    });
    return newWishlistLink;
  })
);

await db.close(console.log("Finished seeding database!"));
