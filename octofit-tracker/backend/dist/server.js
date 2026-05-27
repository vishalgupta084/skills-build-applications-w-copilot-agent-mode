"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 8000);
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const BASE_URL = CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.get('/api', (_req, res) => {
    res.json({
        message: 'OctoFit Tracker API is running',
        endpoints: [
            '/api/users',
            '/api/teams',
            '/api/activities',
            '/api/leaderboard',
            '/api/workouts'
        ]
    });
});
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`OctoFit Tracker backend running at ${BASE_URL}`);
            if (CODESPACE_NAME) {
                console.log(`Codespaces URL: ${BASE_URL}`);
            }
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
