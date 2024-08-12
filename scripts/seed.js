import { User, Encounter, Monster, db } from "../src/model.js";
import reviewData from "./data/reviews.json" assert { type: "json" };

console.log("syncing database...");
await db.sync({ force: true });

console.log("Seeding database...");

const usersToCreate = [
  User.create({
    fname: `john`,
    lname: `doe`,
    email: `user@test.com`,
    password: "test",
  }),
];

const usersInDb = await Promise.all(usersToCreate);

const reviewsInDb = await Promise.all(
  reviewData.map((encounter) => {
    const { locationName, reviewContent, markReview, country, city } = review;
    const newReview = Review.create({
      locationName: locationName,
      reviewContent: reviewContent,
      markReview: markReview,
      country: country,
      city: city,
      userId: 1,
    });
  })
);
