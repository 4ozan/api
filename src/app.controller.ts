import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

import { IsString } from 'class-validator';

class ChatBlogDto {
  @IsString()
  prompt: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('sama')
  async chatBlog(@Body() body: ChatBlogDto) {
    console.log('Received POST /sama with body:', body);
    try {
      const { prompt } = body;

      if (!prompt) {
        console.log('No prompt provided');
        return { error: 'Prompt is required.' };
      }

      if (!process.env.MISTRAL_API_KEY || !process.env.FIRECRAWL_API_KEY) {
        console.log('API keys missing:', {
          MISTRAL_API_KEY: !!process.env.MISTRAL_API_KEY,
          FIRECRAWL_API_KEY: !!process.env.FIRECRAWL_API_KEY,
        });
        return { error: 'API keys are missing from environment variables.' };
      }

      console.log('Calling chatWithSamBlog with prompt:', prompt);
      const answer = await this.appService.chatWithSamBlog(prompt);
      console.log('Received answer from chatWithSamBlog:', answer);
      return { answer };
    } catch (error) {
      console.error('Error in /sama:', error);
      return { error: error?.message || 'An unknown error occurred.' };
    }
  }

  @Get('status')
  getStatus(): string {
    return this.appService.getStatus();
  }
}
