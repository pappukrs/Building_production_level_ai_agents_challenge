require("dotenv").config();

const GeminiClient = require("./llm/gemini");
const agent = require("./agent");

const llm = new GeminiClient(process.env.GEMINI_API_KEY);

(async () => {
    const response = await agent({
        llm,
        userInput: `
We are looking for a React Native developer
with 2 years experience.
`,
    });

    try {
        const parsed = JSON.parse(response);
        console.log("✅ Parsed JSON:", parsed);
    } catch (err) {
        console.error("❌ Invalid JSON:", response);
    }
})();
