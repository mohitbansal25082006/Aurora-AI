import OpenAI from 'openai';

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Research prompt templates for different profiles
const RESEARCH_PROMPTS = {
  academic: `You are an academic researcher. Provide a comprehensive, well-cited analysis of the following topic. Focus on scholarly sources, peer-reviewed research, and established theories. Include citations where possible and maintain a formal, objective tone.`,
  journalist: `You are an investigative journalist. Research the following topic with a focus on recent developments, key players, and potential controversies. Verify information from multiple sources and highlight any conflicting reports. Maintain a neutral, fact-based approach.`,
  analyst: `You are a data analyst. Research the following topic with an emphasis on statistics, trends, and quantitative data. Identify key metrics, growth patterns, and data-driven insights. Provide numerical evidence where possible.`,
};

export async function generateResearchSummary(
  query: string, 
  profile: keyof typeof RESEARCH_PROMPTS,
  context: string
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: RESEARCH_PROMPTS[profile],
        },
        {
          role: "user",
          content: `Research Query: ${query}\n\nContext: ${context}\n\nPlease provide a comprehensive research summary based on the query and context provided.`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    return response.choices[0]?.message?.content || "No summary generated.";
  } catch (error) {
    console.error("Error generating research summary:", error);
    throw new Error("Failed to generate research summary");
  }
}

export async function extractEntities(text: string): Promise<Array<{name: string, type: string, relevance: number}>> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are an entity extraction expert. Extract key entities (people, organizations, locations, products, concepts) from the provided text and categorize them. For each entity, provide a relevance score from 0.0 to 1.0 indicating its importance to the text.",
        },
        {
          role: "user",
          content: `Extract entities from the following text:\n\n${text}\n\nReturn the results as a JSON array of objects with properties: name, type, and relevance.`,
        },
      ],
      temperature: 0.2,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content || '{"entities": []}';
    const parsed = JSON.parse(content);
    return parsed.entities || [];
  } catch (error) {
    console.error("Error extracting entities:", error);
    return [];
  }
}

export async function generateTimeline(query: string, context: string): Promise<Array<{date: string, event: string, description: string}>> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are a research historian. Create a timeline of key events related to the provided query and context. Focus on significant developments, milestones, and turning points.",
        },
        {
          role: "user",
          content: `Research Query: ${query}\n\nContext: ${context}\n\nGenerate a timeline of key events. Return the results as a JSON array of objects with properties: date (in YYYY-MM-DD format), event (short title), and description.`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content || '{"timeline": []}';
    const parsed = JSON.parse(content);
    return parsed.timeline || [];
  } catch (error) {
    console.error("Error generating timeline:", error);
    return [];
  }
}