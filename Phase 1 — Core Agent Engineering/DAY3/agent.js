async function agent({ llm, userInput }) {
    const systemPrompt = `
You are an information extraction agent.

STRICT RULES:
- Output ONLY valid JSON
- No explanations
- No markdown
- No extra text

JSON SCHEMA:
{
  "skills": string[],
  "experience_years": number,
  "role": string,
  "is_valid_job": boolean
}

If information is missing:
- Use empty array for skills
- Use 0 for experience_years
- Use null for role
- is_valid_job must still be true or false
`;

    const prompt = `${systemPrompt}\n\nINPUT:\n${userInput}`;

    return llm.generate({
        prompt,
        temperature: 0,
    });
}

module.exports = agent;
