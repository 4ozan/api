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

    const { prompt } = body;

    if (!prompt) {
      console.log('No prompt provided');
      return { error: 'Prompt is required.' };
    }

    if (!process.env.MISTRAL_API_KEY) {
      console.log('MISTRAL_API_KEY missing');
      return { error: 'MISTRAL_API_KEY is missing from environment variables.' };
    }

    try {
      console.log('Calling chatWithSamBlog with prompt:', prompt);
      const answers = await this.appService.chatWithSamBlog(prompt);
      console.log('Received answers from chatWithSamBlog:', answers);
      return { answers };
    } catch (error) {
      console.error('Error in /sama:', error);
      return { error: error?.message || 'An unknown error occurred.' };
    }
  }

}
