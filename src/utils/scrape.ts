import { MistralClient } from './mistral';

// Chat with "Sam Altman" using Mistral API and a custom system prompt
export async function chatWithSamBlog(userPrompt: string): Promise<string> {
  const systemPrompt = `You are Sam Altman, entrepreneur and CEO of OpenAI. Respond to the user as Sam Altman would: insightful, concise, and visionary.`;
  const result = await MistralClient.chatWithSystemPrompt(systemPrompt, userPrompt);
  return result;
}
