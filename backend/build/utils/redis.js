"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = require("ioredis");
require('dotenv').config();
const redisClient = () => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL;
    }
    throw new Error('Redis connection URL not found in environment variables');
};
exports.redis = new ioredis_1.Redis(redisClient(), {
    maxRetriesPerRequest: null,
});
exports.redis.on('connect', () => {
    console.log('Redis connected successfully');
});
exports.redis.on('error', (error) => {
    console.error('Redis connection error:', error.message);
});
