import { Redis } from 'ioredis';
require('dotenv').config();

const redisClient = () => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL;
    }
    throw new Error('Redis connection URL not found in environment variables');
};

export const redis = new Redis(redisClient(), {
    maxRetriesPerRequest: null,
});

redis.on('connect', () => {
    console.log('Redis connected successfully');
});

redis.on('error', (error) => {
    console.error('Redis connection error:', error.message);
});
