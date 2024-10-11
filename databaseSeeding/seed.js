import fs from "node:fs";
import mongoose from "mongoose";
import Beer from "../models/Beer.js";
import Manufacturer from "../models/Manufacturer.js";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_NAME = process.env.DATABASE_NAME;
const MONGO_URL = process.env.MONGO_URL;

const insertIntoDatabase = async (filename, model) => {
  const beerData = await fs.readFileSync("databaseSeeding/data/" + filename, "utf-8");

  await model.deleteMany({});
  console.log("Existing data cleared for ", model);
  await model.insertMany(JSON.parse(beerData));
  console.log("Database seeded for ", model);
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL, { dbName: DATABASE_NAME });

    await insertIntoDatabase("manufacturersData.json", Manufacturer);
    await insertIntoDatabase("beersData.json", Beer);

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database", err);
    mongoose.connection.close();
  }
};

seedDatabase();
