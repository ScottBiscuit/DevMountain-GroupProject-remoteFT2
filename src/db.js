import { Sequelize } from "sequelize";

async function connectToDB(dbURL) {
  console.log(`Connecting to DB: ${dbURL}`);

  const sequelize = new Sequelize(dbURL, {
    logging: console.log, // set logging: false to disable outputting SQL queries to console
    define: {
      underscored: true,
      timestamps: false,
    },
  });

  try {
    await sequelize.authenticate();
    console.log("Connected to DB successfully!");
  } catch (error) {
    console.error("Unable to connect to DB:", error);
  }

  return sequelize;
}

export default connectToDB;
