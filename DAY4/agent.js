const searchJobs = require("./tools/searchJobs");

async function agent({ llm, userInput }) {
    const systemPrompt = `
You are a job search agent.

You can use the following tool:

TOOL: searchJobs
DESCRIPTION: Use this tool when the user asks to find jobs.
INPUT JSON:
{
  "skill": string,
  "location": string,
  "experience": number
}

RULES:
- Decide whether to use the tool
- If tool is needed, output ONLY JSON in this format:
{
  "action": "searchJobs",
  "params": { ... }
}

- If no tool is needed, output:
{
  "action": "none",
  "message": string
}
`

    const prompt = `${systemPrompt}\n\nUSER INPUT:\n${userInput}`;

    const decision = await llm.generate({
        prompt,
        temperature: 0,
    });

    let parsed;
    try {
        console.log("DEBUG: Raw LLM output:", decision);
        // Sanitize the output - remove markdown code blocks if present
        const cleaned = decision.replace(/```json/g, "").replace(/```/g, "").trim();
        parsed = JSON.parse(cleaned);
    } catch (e) {
        console.error("JSON Parse Error:", e);
        throw new Error("Invalid JSON from agent");
    }

    // Tool execution
    if (parsed.action === "searchJobs") {
        const results = await searchJobs(parsed.params);
        return {
            action: "searchJobs",
            results,
        };
    }

    return parsed;
}

module.exports = agent;
