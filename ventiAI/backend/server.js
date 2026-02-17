const express = require('express');
const path = require('path');
const VentingApp = require('./src/VentingApp');

const app = express();
const ventingApp = new VentingApp();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
app.listen(PORT, () => {
    console.log(`Venting App running at http://localhost:${PORT}`);
});

module.exports = app;
