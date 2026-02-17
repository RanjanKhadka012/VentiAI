const VentingApp = require("../src/VentingApp");

console.log("=== Venting App Demo ===\n");

const app = new VentingApp();
const testInputs = [
    "I'm feeling really sad and lonely today. Nothing seems to help.",
    "I'm so stressed about my upcoming deadline. Everything feels overwhelming.",
    "I'm really angry at how unfair this situation is!",
    "I just got great news! I'm so happy right now!"
];

console.log("Processing user inputs...\n");

testInputs.forEach((input, index) => {
    console.log(`--- Conversation ${index + 1} ---`);
    console.log(`User: "${input}"\n`);

    const result = app.processUserInput(input);

    if (result.success) {
        console.log(`Detected Emotion: ${result.tone}`);
        console.log(`Response: "${result.response}"\n`);
    } else {
        console.log(`Error: ${result.error}\n`);
    }
});

// Display statistics
console.log("=== Conversation Statistics ===\n");
const stats = app.getStatistics();
console.log(`Total Conversations: ${stats.totalConversations}`);
console.log("Emotion Breakdown:");
console.log(`  - Sadness: ${stats.emotionBreakdown.sadness}`);
console.log(`  - Stress: ${stats.emotionBreakdown.stress}`);
console.log(`  - Anger: ${stats.emotionBreakdown.anger}`);
console.log(`  - Happiness: ${stats.emotionBreakdown.happiness}`);
console.log(`  - Neutral: ${stats.emotionBreakdown.neutral}\n`);

// Display full history
console.log("=== Full Conversation History ===\n");
const history = app.getHistory();
history.forEach((record, index) => {
    console.log(`Record ${index + 1}:`);
    console.log(`  ID: ${record.id}`);
    console.log(`  Time: ${record.timestamp}`);
    console.log(`  Emotion: ${record.emotion}`);
    console.log(`  User Text: "${record.text}"`);
    console.log(`  Response: "${record.feedback}"\n`);
});
