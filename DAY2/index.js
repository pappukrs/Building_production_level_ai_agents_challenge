require("dotenv").config();

const GeminiClient = require("./llm/gemini");
const agent = require("./agent");

const llm = new GeminiClient(process.env.GEMINI_API_KEY);

agent({
    llm,
    userInput: "Explain what an AI agent is.",
})
    .then(console.log)
    .catch(console.error);
