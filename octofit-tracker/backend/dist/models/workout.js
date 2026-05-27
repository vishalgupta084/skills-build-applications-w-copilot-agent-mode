"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, required: true, enum: ['low', 'medium', 'high'] },
    createdAt: { type: Date, required: true, default: () => new Date() }
}, { timestamps: true });
const Workout = mongoose_1.default.model('Workout', workoutSchema);
exports.default = Workout;
