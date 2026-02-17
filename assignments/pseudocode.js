CLASS SentimentAnalyzer {
    CONSTRUCTOR() {
        this.emotionalTone = "" 
    }

    METHOD analyzeInput(inputText) {
        IF inputText is EMPTY OR INVALID THEN
            RETURN "Error: Input required" 
    
        this.emotionalTone = PERFORM_SENTIMENT_ANALYSIS(inputText)
        RETURN this.emotionalTone
    }
}

CLASS ResponseGenerator {
    METHOD generateResponse(tone) {
        LET response = ""
        
        IF tone == "sadness" THEN
            response = "I hear how much pain you're in. It's okay to feel this way." 
        ELSE IF tone == "stress" THEN
            response = "That sounds overwhelming. Remember to breathe." 
        ELSE
            response = "Thank you for sharing your thoughts with me." 
            
        RETURN response
    }
}

CLASS StorageManager {
    METHOD saveToLocal(ventText, tone, aiResponse) {

        LET record = { timestamp: NOW(), text: ventText, emotion: tone, feedback: aiResponse }
        SAVE record TO LOCAL_BROWSER_STORAGE
    }
}

