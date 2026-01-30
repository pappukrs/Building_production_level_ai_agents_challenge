
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

// console.log(GoogleGenAI)

// Create client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function agent(userInput) {
    // 1. Observe
    const context = userInput;

    // 2. Think (agent role)
    const systemPrompt = `
You are a helpful AI agent.
Answer concisely.
If the question is unrelated, reply exactly: Out of scope.
Respond with exactly 2 bullet points.
`;

    // 3. Act
    const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: [
            {
                role: "user",
                parts: [{ text: systemPrompt + "\n\n" + context }],
            },
        ],
    });

    // 4. Return result
    return response.text;
}

// Run agent
agent("Explain what an AI agent is.")
    .then(console.log)
    .catch(console.error);
