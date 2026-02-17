# Venting App - Sentiment Analysis Chatbot

A mental health-focused application that analyzes user emotions through sentiment analysis and provides empathetic responses.

## Features

- **Sentiment Analysis**: Automatically detects emotional tone from user input (sadness, stress, anger, happiness, neutral)
- **Empathetic Responses**: Generates contextually appropriate responses based on detected emotions
- **Conversation Storage**: Saves all conversations locally with timestamps and emotion tracking
- **History & Statistics**: View conversation history, filter by emotion, and get conversation statistics

## Project Structure

```
src/
├── SentimentAnalyzer.js    # Analyzes emotional tone from text
├── ResponseGenerator.js     # Generates empathetic responses
├── StorageManager.js        # Manages local storage of conversations
└── VentingApp.js           # Main orchestrator class

examples/
└── demo.js                 # Example usage and demo

package.json               # Project dependencies and scripts
README.md                  # This file
pseudocode.js              # Original pseudocode design
```

## Installation

```bash
npm install
```

## Usage

### Basic Example

```javascript
const VentingApp = require("./src/VentingApp");

const app = new VentingApp();

// Process user input
const result = app.processUserInput("I'm feeling really sad and lonely");

console.log(result.tone);        // "sadness"
console.log(result.response);    // Empathetic response from AI
console.log(result.record);      // Saved record with timestamp
```

### Running the Demo

```bash
npm start
```

or

```bash
npm run dev
```

## API Documentation

### VentingApp

Main application class that coordinates all components.

**Methods:**
- `processUserInput(userInput)` - Process user text and generate response
- `getHistory()` - Get all saved conversations
- `getHistoryByTone(tone)` - Filter conversations by emotion
- `getStatistics()` - Get conversation statistics
- `deleteConversation(id)` - Delete a specific conversation
- `clearHistory()` - Clear all conversations

### SentimentAnalyzer

Analyzes emotional tone of input text.

**Methods:**
- `analyzeInput(inputText)` - Analyzes text and returns detected emotion

**Supported Emotions:**
- sadness
- stress
- anger
- happiness
- neutral

### ResponseGenerator

Generates empathetic responses based on emotion.

**Methods:**
- `generateResponse(tone)` - Returns a random response for the given tone
- `getResponseOptions(tone)` - Gets all available responses for a tone

### StorageManager

Manages conversation storage in local storage (browser) or in-memory (Node.js).

**Methods:**
- `saveToLocal(ventText, tone, aiResponse)` - Save conversation record
- `getAllRecords()` - Retrieve all records
- `getRecordsByTone(tone)` - Filter records by emotion
- `deleteRecord(id)` - Delete a specific record
- `clearAllRecords()` - Clear all records
- `getRecordCount()` - Get total number of records

## Conversation Record Structure

```javascript
{
  id: "record_1676500000000_abc123def",
  timestamp: "2023-02-15T10:30:00.000Z",
  text: "User's venting text",
  emotion: "sadness",
  feedback: "AI's empathetic response"
}
```

## Statistics Output

```javascript
{
  totalConversations: 4,
  emotionBreakdown: {
    sadness: 1,
    stress: 1,
    anger: 1,
    happiness: 1,
    neutral: 0
  },
  lastConversation: { /* record object */ }
}
```

## Technology Stack

- **Runtime**: Node.js
- **Language**: JavaScript (ES6+)
- **Storage**: Local Storage (Browser) / In-Memory (Node.js)
- **Testing**: Jest (configured)

## Future Enhancements

- [ ] Advanced NLP using machine learning models
- [ ] User authentication
- [ ] Multi-language support
- [ ] Data visualization for emotion trends
- [ ] Integration with mental health resources
- [ ] Web UI using React/Vue
- [ ] Backend API with database
- [ ] Real-time recommendations

## License

MIT

## Author

khadk046
