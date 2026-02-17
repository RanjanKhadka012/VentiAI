class ResponseGenerator {
    constructor() {
        this.responses = {
            sadness: [
                "I hear how much pain you're in. It's okay to feel this way.",
                "It sounds like you're going through a tough time. Remember, you're not alone.",
                "Your feelings are valid. Take the time you need to process this.",
                "I'm here to listen. Thank you for trusting me with what you're feeling."
            ],
            stress: [
                "That sounds overwhelming. Remember to breathe.",
                "It's clear you're carrying a lot right now. Be gentle with yourself.",
                "Take a step back if you can. Breaking things down into smaller tasks might help.",
                "Your stress is understandable. Consider taking a break when possible."
            ],
            anger: [
                "I can sense your frustration. Your feelings are justified.",
                "It's okay to be angry. Your feelings are valid.",
                "Sounds like something unfair has happened. Take your time processing it.",
                "Your anger makes sense given the situation. Let it out if it helps."
            ],
            happiness: [
                "That's wonderful! I'm glad you're feeling good!",
                "It sounds like things are going well for you. Celebrate this moment!",
                "Your joy is contagious! Keep up that positive energy!",
                "That's fantastic! I love hearing about good things happening to you."
            ],
            neutral: [
                "Thank you for sharing your thoughts with me.",
                "I appreciate you opening up. What else is on your mind?",
                "Thank you for the update. How are you doing with all of this?",
                "I'm listening. Tell me more about what you're experiencing."
            ]
        };
    }

    generateResponse(tone) {
        const responseList = this.responses[tone] || this.responses.neutral;
        const randomIndex = Math.floor(Math.random() * responseList.length);
        return responseList[randomIndex];
    }

    getResponseOptions(tone) {
        return this.responses[tone] || this.responses.neutral;
    }
}

module.exports = ResponseGenerator;
