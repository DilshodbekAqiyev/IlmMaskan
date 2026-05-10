import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Course from "../models/course.model";

dotenv.config();

const seedCourse = async () => {
    try {
        console.log("Connecting to:", process.env.DB_URL);
        await mongoose.connect(process.env.DB_URL!);
        console.log("Connected!");

        const courseData = {
            name: "HTMLda dasturlash",
            description: "HTMLda dasturlash kursiga xush kelibsizlar. Bu kurs davomida sizlar HTMLning barcha asosiy va murakkab tushunchalarini o'rganasiz.",
            categories: "Web dasturlash",
            price: 0,
            estimatedPrice: 9.99,
            thumbnail: {
                public_id: "courses/d104djgqtuvjabuisexf",
                url: "https://res.cloudinary.com/dc01finb0/image/upload/v1778419900/courses/d104djgqtuvjabuisexf.jpg",
            },
            tags: "WEB,HTML",
            level: "boshlang'ich",
            demoUrl: "https://youtu.be/9dUhZq9dkHM?si=lUm31y4nmiosfSH-",
            benefits: [
                { title: "HTML yordamida zamonaviy web sahifalar yaratishni" },
                { title: "Web sahifa strukturasini to‘g‘ri tashkil qilishni" },
                { title: "Formlar, jadval va media elementlar bilan ishlashni" },
                { title: "Semantik HTML teglaridan foydalanishni" },
                { title: "Responsive sahifalar uchun asosiy tuzilma tayyorlashni" },
            ],
            prerequisites: [
                { title: "Kompyuterdan oddiy foydalanish ko‘nikmasi" },
                { title: "Internet brauzer bilan ishlashni bilish" },
                { title: "Kod yozishga qiziqish" },
                { title: "Hech qanday dasturlash tajribasi talab qilinmaydi ✨" },
            ],
            courseData: [
                {
                    videoUrl: "https://youtu.be/9dUhZq9dkHM?si=sr0PnWyOfIi4e5c-",
                    title: "HTMLda dasturlash | 0. Kurs haqida",
                    videoSection: "HTMLda dasturlash ",
                    description: "HTMLda dasturlash kursiga xush kelibsizlar. Bu kurs davomida sizlar HTMLning asoslari bilan tanishasiz.",
                    videoLength: 5,
                    links: [
                        {
                            title: "Youtube",
                            url: "https://youtu.be/9dUhZq9dkHM?si=Eu3bWMUypuKF2eeR",
                        },
                    ],
                    suggestion: "",
                },
                {
                    videoUrl: "https://youtu.be/E9OKpacyUSc?si=e7YDSqUkODSfOrI2",
                    title: "HTMLda dasturlash | 1. WEB haqida",
                    videoSection: "HTMLda dasturlash ",
                    description: "Ushbu darsda WEB qanday ishlashi va uning asosiy qismlari haqida gaplashamiz.",
                    videoLength: 7,
                    links: [
                        {
                            title: "Youtube",
                            url: "https://youtu.be/E9OKpacyUSc?si=e7YDSqUkODSfOrI2",
                        },
                    ],
                },
                {
                    videoUrl: "https://youtu.be/_j7yneg6if0?si=JR37wMTAxhOMLrt3",
                    title: "HTMLda dasturlash | 2. Kirish",
                    videoSection: "HTMLda dasturlash ",
                    description: "HTMLning asosiy sintaksisi va birinchi kodimizni yozamiz.",
                    videoLength: 10,
                    links: [
                        {
                            title: "Youtube",
                            url: "https://youtu.be/_j7yneg6if0?si=JR37wMTAxhOMLrt3",
                        },
                    ],
                },
            ],
            ratings: 0,
            purchased: 0,
        };

        // Check if course already exists
        const existingCourse = await Course.findOne({ name: courseData.name });
        if (existingCourse) {
            console.log("Course already exists, updating...");
            await Course.findByIdAndUpdate(existingCourse._id, courseData);
        } else {
            console.log("Creating new course...");
            await Course.create(courseData);
        }

        console.log("Done!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding course:", error);
        process.exit(1);
    }
};

seedCourse();
