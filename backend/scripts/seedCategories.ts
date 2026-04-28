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
  { title: "Tadbirkorlik" },
  { title: "Soft skills" },
  { title: "Ingliz tili" },
  { title: "O'zbek tili" },
  { title: "Rus tili" },
  { title: "Sertifikatlar" },
  { title: "Arxitektura" },
  { title: "Boshqa" },
];

const seedCategories = async () => {
  try {
    const url = "mongodb+srv://support:MEsWF6djajegiRit@ilmmaskan.etlfqot.mongodb.net/?appName=IlmMaskan"
    console.log(url);
    await mongoose.connect(url);
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
