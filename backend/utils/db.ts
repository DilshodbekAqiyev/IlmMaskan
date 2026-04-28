import mongoose from 'mongoose';
require('dotenv').config();

const dbUrl:string = process.env.DB_URL || '';

const connectDB = async () => {
    try {
        if (!dbUrl) {
            throw new Error('MongoDB connection string (DB_URL) is missing in .env');
        }
        await mongoose.connect(dbUrl).then((data:any) => {
            console.log(`Database connected with ${data.connection.host}`)
        })
    } catch (error:any) {
        console.error(`Database connection error: ${error.message}`);
        console.log('Retrying database connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;