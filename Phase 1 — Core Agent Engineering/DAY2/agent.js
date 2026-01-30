async function agent({ llm, userInput }) {
    const systemPrompt = `
You are a helpful AI agent.
Answer concisely.
If the question is unrelated, reply exactly: Out of scope.
Respond with exactly 2 bullet points.
`;

    const prompt = `${systemPrompt}\n\nUser: ${userInput}`;

    return llm.generate({
        prompt,
        temperature: 0.2,
    });
}

module.exports = agent;
