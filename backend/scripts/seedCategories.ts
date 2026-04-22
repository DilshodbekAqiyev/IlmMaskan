import mongoose from "mongoose";
import dotenv from "dotenv";
import LayoutModel from "../models/layout.model";

dotenv.config();

const categories = [
  { title: "Web dasturlash" },
  { title: "Mobil ilovalar" },
  { title: "Sun'iy intellekt" },
  { title: "Ma'lumotlar fani" },
  { title: "Kiberxavfsizlik" },
  { title: "Dizayn" },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || "");
    console.log("Connected to MongoDB");

    const existing = await LayoutModel.findOne({ type: "Categories" });
    if (existing) {
      console.log("Categories already exist, updating...");
      await LayoutModel.findByIdAndUpdate(existing._id, {
        type: "Categories",
        categories: categories,
      });
    } else {
      console.log("Creating new categories...");
      await LayoutModel.create({
        type: "Categories",
        categories: categories,
      });
    }

    console.log("Categories seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
};

seedCategories();
