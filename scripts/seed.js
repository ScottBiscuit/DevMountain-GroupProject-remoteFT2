import { User, Image, Review, Tag, db } from "../src/model.js";
import reviewData from "./data/reviews.json" assert { type: "json" };
import imageData from "./data/images.json" assert { type: "json" };
import tagData from "./data/tags.json" assert { type: "json" };

console.log("syncing database...");
await db.sync({ force: true });

console.log("Seeding database...");

// const usersToCreate = [
//   User.create({
//     userName: `johndoe`,
//     email: `user@test.com`,
//     password: "test",
//   }),
// ];

const usersInDb = await Promise.all(
  User.create({
    userName: `johndoe`,
    email: `user@test.com`,
    password: "test",
  })
);

const reviewsInDb = await Promise.all(
  reviewData.map((review) => {
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

const imagesInDb = await Promise.all(
  imageData.map((image) => {
    const { imageName, imageSrc, imageDesc } = image;
    const newImage = Image.create({
      imageName: imageName,
      imageSrc: imageSrc,
      imageDesc: imageDesc,
    });
  })
);

const tagsInDb = await Promise.all(
  tagData.map((tag) => {
    const { tagName } = tag;
    const newTag = Tag.create({
      tagName: tagName,
    });
  })
);
