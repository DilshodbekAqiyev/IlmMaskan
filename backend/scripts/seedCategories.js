const mongoose = require('mongoose');
require('dotenv').config();
const dns = require("dns");

dns.setServers(['8.8.8.8','1.1.1.1'])

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
    {title: "Ingliz tili" },
    { title: "Dizayn" },
];

async function seed() {
    try {
        console.log("Connecting to:", "mongodb+srv://dilshodjonaqiyev:KkpvmebSH5vtI30c@ilmmaskan.cwnl7sq.mongodb.net/");
        await mongoose.connect("mongodb+srv://dilshodjonaqiyev:KkpvmebSH5vtI30c@ilmmaskan.cwnl7sq.mongodb.net/");
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
