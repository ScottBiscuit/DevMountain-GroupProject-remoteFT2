import { User, Image, Review, Tag, db } from "../src/model.js";
import reviewData from "./data/reviews.json" assert { type: "json" };
import imageData from "./data/images.json" assert { type: "json" };
import tagData from "./data/tags.json" assert { type: "json" };

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
    })
  );
}

const usersInDB = await Promise.all(usersToCreate);

const reviewsInDb = await Promise.all(
  reviewData.map((review) => {
    const { locationName, reviewContent, markReview, country, city, userId, likeCount } = review;
    const newReview = Review.create({
      locationName: locationName,
      reviewContent: reviewContent,
      markReview: markReview,
      country: country,
      city: city,
      userId: userId,
      likeCount: likeCount
    });
    return newReview;
  })
);

const imagesInDb = await Promise.all(
  imageData.map((image) => {
    const { imageName, imageSrc, imageDesc, reviewId } = image;
    const newImage = Image.create({
      imageName: imageName,
      imageSrc: imageSrc,
      imageDesc: imageDesc,
      reviewId: reviewId
    });
    return newImage;
  })
);

const tagsInDb = await Promise.all(
  tagData.map((tag) => {
    const { tagName } = tag;
    const newTag = Tag.create({
      tagName: tagName,
    });
    return newTag;
  })
);

await db.close(console.log("Finished seeding database!"));
