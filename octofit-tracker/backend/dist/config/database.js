"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const connectDatabase = async () => {
    mongoose_1.default.set('strictQuery', true);
    await mongoose_1.default.connect(MONGODB_URI);
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
};
exports.connectDatabase = connectDatabase;
