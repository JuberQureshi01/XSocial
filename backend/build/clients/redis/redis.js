"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
require("dotenv/config"); // loads .env variables at the top
const ioredis_1 = __importDefault(require("ioredis"));
if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL is not defined in .env");
}
exports.redisClient = new ioredis_1.default(process.env.REDIS_URL);
