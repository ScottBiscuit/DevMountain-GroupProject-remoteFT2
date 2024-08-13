import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";
import { type } from "os";

//change to your own database file path
export const db = await connectToDB(
  // "postgres://josep:admin@localhost:5432/travelBlog"
  "postgres://scottjohnstone:admin@localhost:5432/travelBlog"
);

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Review extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Tag extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Image extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class WishlistItem extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class WishlistReview extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userImageSrc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userImageDesc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "user",
    sequelize: db,
  }
);

Review.init(
  {
    reviewId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    locationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewContent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likeCount: {
      type: DataTypes.INTEGER,
    },
    markReview: {
      type: DataTypes.BOOLEAN,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetAddress: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "review",
    sequelize: db,
  }
);

Tag.init(
  {
    tagId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tagName: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "tag",
    sequelize: db,
  }
);

Image.init(
  {
    imageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imageSrc: {
      type: DataTypes.STRING,
    },
    imageName: {
      type: DataTypes.STRING,
    },
    imageDesc: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "image",
    sequelize: db,
  }
);

WishlistItem.init(
  {
    wishId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    modelName: "wishlistReview",
    sequelize: db,
  }
);

WishlistReview.init(
  {
    itemId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    streetAddress: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "wishlistItem",
    sequelize: db,
  }
);

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

User.hasMany(WishlistItem, { foreignKey: "userId" });
WishlistItem.belongsTo(User, { foreignKey: "userId" });

Review.hasMany(WishlistReview, { foreignKey: "reviewId" });
WishlistReview.belongsTo(Review, { foreignKey: "reviewId" });

WishlistItem.hasMany(WishlistReview, { foreignKey: "itemId" });
WishlistReview.belongsTo(WishlistItem, { foreignKey: "itemId" });

Review.hasMany(Tag, { foreignKey: "reviewId" });
Tag.belongsTo(Review, { foreignKey: "reviewId" });

Review.hasMany(Image, { foreignKey: "reviewId" });
Image.belongsTo(Review, { foreignKey: "reviewId" });
