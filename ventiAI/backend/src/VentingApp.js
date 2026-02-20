const SentimentAnalyzer = require("./SentimentAnalyzer");
const ResponseGenerator = require("./ResponseGenerator");
const StorageManager = require("./StorageManager");

class VentingApp {
    constructor() {
        this.analyzer = new SentimentAnalyzer();
        this.responseGenerator = new ResponseGenerator();
        this.storage = new StorageManager();
    }

    processUserInput(userInput) {
        const tone = this.analyzer.analyzeInput(userInput);

        if (tone === "Error: Input required") {
            return {
                success: false,
                error: tone,
                tone: null,
                response: null,
                record: null
            };
        }

        const response = this.responseGenerator.generateResponse(tone);
        const record = this.storage.saveToLocal(userInput, tone, response);

        return {
            success: true,
            tone: tone,
            response: response,
            record: record
        };
    }

    getHistory() {
        return this.storage.getAllRecords();
    }

    getHistoryByTone(tone) {
        return this.storage.getRecordsByTone(tone);
    }

    getStatistics() {
        const records = this.storage.getAllRecords();
        
        // Ensure records is an array
        if (!Array.isArray(records)) {
            return {
                totalConversations: 0,
                emotionBreakdown: {
                    sadness: 0,
                    stress: 0,
                    anger: 0,
                    happiness: 0,
                    neutral: 0
                },
                lastConversation: null
            };
        }
        
        const stats = {
            totalConversations: records.length,
            emotionBreakdown: {
                sadness: 0,
                stress: 0,
                anger: 0,
                happiness: 0,
                neutral: 0
            },
            lastConversation: records.length > 0 ? records[records.length - 1] : null
        };

        records.forEach(record => {
            if (record && record.emotion && stats.emotionBreakdown.hasOwnProperty(record.emotion)) {
                stats.emotionBreakdown[record.emotion]++;
            }
        });

        return stats;
    }

    deleteConversation(id) {
        return this.storage.deleteRecord(id);
    }

    clearHistory() {
        this.storage.clearAllRecords();
    }
}

module.exports = VentingApp;
