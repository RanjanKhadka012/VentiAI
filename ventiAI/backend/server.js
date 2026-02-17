const express = require('express');
const path = require('path');
const VentingApp = require('./src/VentingApp');

const app = express();
const ventingApp = new VentingApp();

// CORS configuration
const cors = require('cors');
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:8000',
        'https://venti-ai.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());
// Serve static files from frontend/public
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.post('/api/vent', (req, res) => {
    const { message } = req.body;

    if (!message || message.trim() === '') {
        return res.status(400).json({ error: 'Message is required' });
    }

    const result = ventingApp.processUserInput(message);

    res.json({
        success: result.success,
        tone: result.tone,
        response: result.response,
        id: result.record?.id
    });
});

app.get('/api/history', (req, res) => {
    const history = ventingApp.getHistory();
    res.json(history);
});

app.get('/api/stats', (req, res) => {
    const stats = ventingApp.getStatistics();
    res.json(stats);
});

app.get('/api/history/:tone', (req, res) => {
    const { tone } = req.params;
    const history = ventingApp.getHistoryByTone(tone);
    res.json(history);
});

app.delete('/api/history/:id', (req, res) => {
    const { id } = req.params;
    const success = ventingApp.deleteConversation(id);
    res.json({ success });
});

app.delete('/api/clear', (req, res) => {
    ventingApp.clearHistory();
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Venting App running on ${HOST}:${PORT}`);
});

module.exports = app;
