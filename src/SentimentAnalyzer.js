class SentimentAnalyzer {
    constructor() {
        this.emotionalTone = "";
        this.sentimentMap = {
            sadness: ["sad", "depressed", "unhappy", "miserable", "heartbroken", "lonely", "empty"],
            stress: ["stressed", "overwhelmed", "anxious", "nervous", "worried", "tense"],
            anger: ["angry", "furious", "mad", "irritated", "annoyed", "frustrated"],
            happiness: ["happy", "excited", "joyful", "great", "wonderful", "amazing"],
            neutral: []
        };
    }

    analyzeInput(inputText) {
        if (!inputText || inputText.trim() === "") {
            return "Error: Input required";
        }
        this.emotionalTone = this._performSentimentAnalysis(inputText);
        return this.emotionalTone;
    }

    _performSentimentAnalysis(inputText) {
        const lowerText = inputText.toLowerCase();
        const scores = {
            sadness: 0,
            stress: 0,
            anger: 0,
            happiness: 0
        };

        Object.keys(this.sentimentMap).forEach(tone => {
            this.sentimentMap[tone].forEach(keyword => {
                if (lowerText.includes(keyword)) {
                    scores[tone] += 1;
                }
            });
        });

        let maxTone = "neutral";
        let maxScore = 0;
        for (const [tone, score] of Object.entries(scores)) {
            if (score > maxScore) {
                maxScore = score;
                maxTone = tone;
            }
        }
        return maxScore > 0 ? maxTone : "neutral";
    }
}

module.exports = SentimentAnalyzer;
