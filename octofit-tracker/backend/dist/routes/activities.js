"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await activity_1.default.find().populate('user team workout');
    res.json({ activities });
});
router.post('/', async (req, res) => {
    const activity = await activity_1.default.create(req.body);
    res.status(201).json({ activity });
});
router.get('/:id', async (req, res) => {
    const activity = await activity_1.default.findById(req.params.id).populate('user team workout');
    if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
    }
    res.json({ activity });
});
exports.default = router;
