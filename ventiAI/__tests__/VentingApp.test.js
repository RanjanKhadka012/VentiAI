/**
 * Tests for VentingApp components
 * Run with: npm test
 */

const SentimentAnalyzer = require("../src/SentimentAnalyzer");
const ResponseGenerator = require("../src/ResponseGenerator");
const StorageManager = require("../src/StorageManager");
const VentingApp = require("../src/VentingApp");

describe("SentimentAnalyzer", () => {
    let analyzer;

    beforeEach(() => {
        analyzer = new SentimentAnalyzer();
    });

    test("should detect sadness", () => {
        const result = analyzer.analyzeInput("I feel so sad and lonely");
        expect(result).toBe("sadness");
    });

    test("should detect stress", () => {
        const result = analyzer.analyzeInput("I'm so stressed and overwhelmed");
        expect(result).toBe("stress");
    });

    test("should detect anger", () => {
        const result = analyzer.analyzeInput("I'm furious about this situation");
        expect(result).toBe("anger");
    });

    test("should detect happiness", () => {
        const result = analyzer.analyzeInput("I'm so happy and excited");
        expect(result).toBe("happiness");
    });

    test("should return neutral for no keywords", () => {
        const result = analyzer.analyzeInput("The weather is nice today");
        expect(result).toBe("neutral");
    });

    test("should return error for empty input", () => {
        const result = analyzer.analyzeInput("");
        expect(result).toBe("Error: Input required");
    });
});

describe("ResponseGenerator", () => {
    let generator;

    beforeEach(() => {
        generator = new ResponseGenerator();
    });

    test("should generate sadness response", () => {
        const response = generator.generateResponse("sadness");
        expect(response).toBeTruthy();
        expect(typeof response).toBe("string");
    });

    test("should have multiple response options for each tone", () => {
        const sadnessResponses = generator.getResponseOptions("sadness");
        expect(sadnessResponses.length).toBeGreaterThan(1);
    });

    test("should return neutral response for unknown tone", () => {
        const response = generator.generateResponse("unknown_tone");
        expect(response).toBeTruthy();
    });
});

describe("StorageManager", () => {
    let storage;

    beforeEach(() => {
        storage = new StorageManager("test_storage");
        storage.clearAllRecords();
    });

    test("should save a record", () => {
        const record = storage.saveToLocal("test text", "sadness", "test response");
        expect(record).toBeTruthy();
        expect(record.emotion).toBe("sadness");
    });

    test("should retrieve all records", () => {
        storage.saveToLocal("text1", "sadness", "response1");
        storage.saveToLocal("text2", "stress", "response2");
        const records = storage.getAllRecords();
        expect(records.length).toBe(2);
    });

    test("should filter records by tone", () => {
        storage.saveToLocal("text1", "sadness", "response1");
        storage.saveToLocal("text2", "stress", "response2");
        storage.saveToLocal("text3", "sadness", "response3");
        const sadRecords = storage.getRecordsByTone("sadness");
        expect(sadRecords.length).toBe(2);
    });

    test("should delete a record", () => {
        const record = storage.saveToLocal("test", "sadness", "response");
        const deleted = storage.deleteRecord(record.id);
        expect(deleted).toBe(true);
        expect(storage.getRecordCount()).toBe(0);
    });

    test("should clear all records", () => {
        storage.saveToLocal("text1", "sadness", "response1");
        storage.saveToLocal("text2", "stress", "response2");
        storage.clearAllRecords();
        expect(storage.getRecordCount()).toBe(0);
    });
});

describe("VentingApp", () => {
    let app;

    beforeEach(() => {
        app = new VentingApp();
        app.clearHistory();
    });

    test("should process user input successfully", () => {
        const result = app.processUserInput("I'm feeling sad");
        expect(result.success).toBe(true);
        expect(result.tone).toBe("sadness");
        expect(result.response).toBeTruthy();
    });

    test("should return error for empty input", () => {
        const result = app.processUserInput("");
        expect(result.success).toBe(false);
        expect(result.error).toBe("Error: Input required");
    });

    test("should save conversation to history", () => {
        app.processUserInput("I'm stressed");
        const history = app.getHistory();
        expect(history.length).toBe(1);
    });

    test("should get statistics", () => {
        app.processUserInput("I'm sad");
        app.processUserInput("I'm stressed");
        const stats = app.getStatistics();
        expect(stats.totalConversations).toBe(2);
        expect(stats.emotionBreakdown.sadness).toBe(1);
        expect(stats.emotionBreakdown.stress).toBe(1);
    });

    test("should filter history by tone", () => {
        app.processUserInput("I'm sad");
        app.processUserInput("I'm stressed");
        app.processUserInput("I'm sad again");
        const sadHistory = app.getHistoryByTone("sadness");
        expect(sadHistory.length).toBe(2);
    });
});
