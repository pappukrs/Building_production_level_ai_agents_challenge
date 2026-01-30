require("dotenv").config();
const GeminiClient = require("./llm/gemini");
const agent = require("./agent");

const llm = new GeminiClient(process.env.GEMINI_API_KEY);

(async () => {
    const result = await agent({
        llm,
        userInput: "Find React Native jobs in Bangalore for 2 years experience",
    });

    console.log(JSON.stringify(result, null, 2));
})();
