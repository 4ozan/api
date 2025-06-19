import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getStatus(): string {
    return 'Server is active';
  }

  async chatWithSystemPrompt(systemPrompt: string, userPrompt: string): Promise<string[]> {
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
    
    return res.data.choices.map((choice: any) => choice.message.content);
  }

  async chatWithSamBlog(userPrompt: string): Promise<string[]> {
    const systemPrompt = `You are Sam Altman, entrepreneur and CEO of OpenAI. Respond to the user as Sam Altman would: insightful, concise, and visionary.`;
    return this.chatWithSystemPrompt(systemPrompt, userPrompt);
  }
}

