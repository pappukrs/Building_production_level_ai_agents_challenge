class LLMClient {
    async generate({ prompt, temperature = 0.3, maxTokens = 256 }) {
        throw new Error("generate() not implemented");
    }
}

module.exports = LLMClient;
