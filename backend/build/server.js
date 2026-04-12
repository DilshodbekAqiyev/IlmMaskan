"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const http_1 = __importDefault(require("http"));
const db_1 = __importDefault(require("./utils/db"));
const socketServer_1 = require("./socketServer");
const app_1 = require("./app");
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
require("dotenv").config();
// Add global error handler for uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    // Log the error but keep the process running
});
// Add handler for unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    // Log the error but keep the process running
});
if (cluster_1.default.isPrimary) {
    // Get the number of available CPU cores
    const numCPUs = os_1.default.cpus().length;
    // Fork workers for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    // Enhanced worker crash handling
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
        console.log("Starting a new worker...");
        cluster_1.default.fork();
    });
}
else {
    // Worker process
    const server = http_1.default.createServer(app_1.app);
    // Wrap server initialization in try-catch
    try {
        // cloudinary config
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_SECRET_KEY,
        });
        (0, socketServer_1.initSocketServer)(server);
        // Add error handler for the server
        server.on("error", (error) => {
            console.error("Server error:", error);
            // Attempt to recover or restart the server
        });
        // create server
        server.listen(process.env.PORT, () => {
            console.log(`Worker ${process.pid} started - Server is connected with port ${process.env.PORT}`);
            // Wrap database connection in try-catch
            (0, db_1.default)().catch((err) => {
                console.error("Database connection error:", err);
                // Server will continue running even if DB connection fails
            });
        });
    }
    catch (error) {
        console.error("Server initialization error:", error);
        // Attempt to restart the worker
        process.exit(1); // Cluster will start a new worker
    }
}
