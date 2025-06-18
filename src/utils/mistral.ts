
import axios from 'axios';

export const MistralClient = {
  async summarizeToSlides(text: string): Promise<string[]> {
    const prompt = `Summarize the following into 4 slides. Each slide should be a clear, concise summary. Content:\n\n${text}`;
    
    const res = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-medium',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const rawText = res.data.choices[0].message.content;
    return rawText.split('\n').filter(Boolean);
  },

  async chatWithSystemPrompt(systemPrompt: string, userPrompt: string): Promise<string> {
    const res = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-medium',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data.choices[0].message.content;
  }
};
