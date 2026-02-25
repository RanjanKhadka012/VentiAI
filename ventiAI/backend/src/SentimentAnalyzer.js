class SentimentAnalyzer {
    constructor() {
        this.emotionalTone = "";
        this.sentimentMap = {
            sadness: ["sad", "depressed", "unhappy", "miserable", "heartbroken", "lonely", "empty", "sorry", "grief", "sorrow", "despair", "hopeless", "hopelessness", "crying", "cry", "tears", "blue", "down", "awful", "terrible", "horrible", "worst", "losing", "loss", "lost", "broken", "shattered", "devastated", "devastation", "hurt", "hurting", "pain", "ache", "aching"],
            stress: ["stressed", "overwhelmed", "anxious", "nervous", "worried", "tense", "panic", "panicked", "pressure", "burden", "struggling", "struggle", "difficulty", "difficult", "hard", "challenging", "challenge", "turbulent", "chaotic", "chaos", "confusion", "confused", "scatter", "scattered", "torn", "ripped", "exhausted", "exhaustion", "tired", "fatigue", "worn out"],
            anger: ["angry", "furious", "mad", "irritated", "annoyed", "frustrated", "punching", "rage", "livid", "incensed", "enraged", "hate", "hateful", "despise", "bitter", "bitterness", "resentful", "resentment", "upset", "agitated", "aggravated", "pissed", "pissed off", "fed up", "fed-up", "sick of", "sick", "furore", "furor", "indignant", "indignation", "outraged", "outrage", "hostile", "vicious", "violent", "violence", "hit", "punch", "kick", "smash", "break", "destroy", "yelling", "yell", "scream", "screaming", "shout", "shouting", "aggressive", "aggression"],
            happiness: ["happy", "excited", "joyful", "great", "wonderful", "amazing", "fantastic", "excellent", "excellent", "love", "loved", "loving", "blessed", "grateful", "gratitude", "thankful", "thanks", "appreciation", "appreciate", "proud", "pride", "proud", "calm", "peace", "peaceful", "content", "contentment", "satisfied", "satisfied", "proud", "honored", "delighted", "delightful", "joy", "bliss", "blissful", "perfect", "beautiful", "beauty", "awesome", "awesome", "superb", "outstanding", "thrilled", "elated", "cheerful"],
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
