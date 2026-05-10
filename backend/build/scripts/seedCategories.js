"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const layout_model_1 = __importDefault(require("../models/layout.model"));
dotenv_1.default.config();
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
        const url = process.env.DB_URL || "";
        console.log(url);
        await mongoose_1.default.connect(url);
        console.log("Connected to MongoDB");
        const existing = await layout_model_1.default.findOne({ type: "Categories" });
        if (existing) {
            console.log("Categories already exist, updating...");
            await layout_model_1.default.findByIdAndUpdate(existing._id, {
                type: "Categories",
                categories: categories,
            });
        }
        else {
            console.log("Creating new categories...");
            await layout_model_1.default.create({
                type: "Categories",
                categories: categories,
            });
        }
        console.log("Categories seeded successfully!");
        process.exit(0);
    }
    catch (error) {
        console.error("Error seeding categories:", error);
        process.exit(1);
    }
};
seedCategories();
