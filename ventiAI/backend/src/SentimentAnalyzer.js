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

        // Negation words that flip the sentiment
        const negationWords = ['not', "n't", 'no', 'never', 'neither', 'nobody', 'nothing', 'dont', 'doesnt', 'didnt', 'wont', 'cant', 'couldnt', 'shouldnt', 'isnt', 'arent', 'wasnt', 'werent'];

        Object.keys(this.sentimentMap).forEach(tone => {
            this.sentimentMap[tone].forEach(keyword => {
                // Check if keyword exists in text
                if (lowerText.includes(keyword)) {
                    // Check if there's a negation word near the keyword (within 2 words before)
                    const words = lowerText.split(/\s+/);
                    const keywordIndex = words.findIndex(w => w.includes(keyword));
                    
                    let hasNegation = false;
                    if (keywordIndex !== -1) {
                        // Check up to 2 words before the keyword
                        for (let i = Math.max(0, keywordIndex - 2); i < keywordIndex; i++) {
                            if (negationWords.some(neg => words[i].includes(neg))) {
                                hasNegation = true;
                                break;
                            }
                        }
                    }
                    
                    if (hasNegation) {
                        // If negated positive emotion, increase sadness/stress
                        if (tone === 'happiness') {
                            scores.sadness += 2;
                        } else if (tone === 'sadness') {
                            // If negated sadness (e.g., "not sad"), slightly increase happiness
                            scores.happiness += 1;
                        }
                    } else {
                        // Normal sentiment scoring
                        scores[tone] += 1;
                    }
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
