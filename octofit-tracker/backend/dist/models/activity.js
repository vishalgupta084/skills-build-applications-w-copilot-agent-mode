"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activitySchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Team', required: true },
    workout: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Workout', required: true },
    activityDate: { type: Date, required: true, default: () => new Date() },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    distanceKm: { type: Number },
    notes: { type: String, default: '' }
}, { timestamps: true });
const Activity = mongoose_1.default.model('Activity', activitySchema);
exports.default = Activity;
