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

export class Like extends Model {
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
    bio: {
      type: DataTypes.TEXT,
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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likeCount: {
      type: DataTypes.INTEGER,
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
    image: {
      type: DataTypes.TEXT,
    },
  },
  {
    modelName: "review",
    sequelize: db,
    timestamps: true,
    updatedAt: true,
  }
);

Like.init(
  {
    likeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    modelName: "like",
    sequelize: db,
  }
);

WishlistItem.init(
  {
    itemId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
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
  },
  {
    modelName: "wishlistItem",
    sequelize: db,
  }
);

WishlistReview.init(
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

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

User.hasMany(WishlistItem, { foreignKey: "userId" });
WishlistItem.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Like, { foreignKey: "userId" });
Like.belongsTo(User, { foreignKey: "userId" });

User.hasMany(WishlistReview, { foreignKey: "userId" });
WishlistReview.belongsTo(User, { foreignKey: "userId" });

Review.hasMany(WishlistReview, { foreignKey: "reviewId" });
WishlistReview.belongsTo(Review, { foreignKey: "reviewId" });

WishlistItem.hasMany(WishlistReview, { foreignKey: "itemId" });
WishlistReview.belongsTo(WishlistItem, { foreignKey: "itemId" });

Review.hasMany(Like, { foreignKey: "reviewId" });
Like.belongsTo(Review, { foreignKey: "reviewId" });
