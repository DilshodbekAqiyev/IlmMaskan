"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const dbUrl = process.env.DB_URL || '';
const connectDB = async () => {
    try {
        if (!dbUrl) {
            throw new Error('MongoDB connection string (DB_URL) is missing in .env');
        }
        await mongoose_1.default.connect(dbUrl, {
            serverSelectionTimeoutMS: 5000,
        }).then((data) => {
            console.log(`Database connected with ${data.connection.host}`);
        });
    }
    catch (error) {
        console.error(`Database connection error: ${error.message}`);
        console.log('Retrying database connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
};
exports.default = connectDB;
