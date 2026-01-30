const { GoogleGenAI } = require("@google/genai");
const LLMClient = require("./index");

class GeminiClient extends LLMClient {
    constructor(apiKey) {
        super();
        this.ai = new GoogleGenAI({ apiKey });
    }

    async generate({ prompt, temperature = 0.3, maxTokens = 256 }) {
        const response = await this.ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }],
                },
            ],
            generationConfig: {
                temperature,
                maxOutputTokens: maxTokens,
            },
        });

        return response.text;
    }
}

module.exports = GeminiClient;
