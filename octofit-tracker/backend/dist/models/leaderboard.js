"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const leaderboardSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    updatedAt: { type: Date, required: true, default: () => new Date() }
}, { timestamps: true });
const Leaderboard = mongoose_1.default.model('Leaderboard', leaderboardSchema);
exports.default = Leaderboard;
