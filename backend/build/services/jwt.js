"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretToken = 'hello123';
const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    }; //sending existing user why we dont send the entire user object due to security purpose
    const token = jsonwebtoken_1.default.sign(payload, secretToken);
    return token;
};
exports.generateToken = generateToken;
const decodeToken = (token) => {
    if (!token) {
        throw new Error("Token is missing");
    }
    try {
        return jsonwebtoken_1.default.verify(token, secretToken);
    }
    catch (error) {
        return null;
    }
};
exports.decodeToken = decodeToken;
