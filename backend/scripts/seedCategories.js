const mongoose = require('mongoose');
require('dotenv').config();

const layoutSchema = new mongoose.Schema({
    type: { type: String },
    faq: [{ question: String, answer: String }],
    categories: [{ title: String }],
    banner: {
        image: { public_id: String, url: String },
        title: String,
        subTitle: String,
    },
});

const Layout = mongoose.model('Layout', layoutSchema);

const categories = [
    { title: "Web dasturlash" },
    { title: "Mobil ilovalar" },
    { title: "Sun'iy intellekt" },
    { title: "Ma'lumotlar fani" },
    { title: "Kiberxavfsizlik" },
    { title: "Dizayn" },
];

async function seed() {
    try {
        console.log("Connecting to:", process.env.DB_URL);
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected!");

        const existing = await Layout.findOne({ type: "Categories" });
        if (existing) {
            console.log("Updating categories...");
            await Layout.findByIdAndUpdate(existing._id, { categories });
        } else {
            console.log("Creating categories...");
            await Layout.create({ type: "Categories", categories });
        }

        console.log("Done!");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
