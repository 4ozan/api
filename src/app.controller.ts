import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MistralClient } from './utils/mistral';
import { chatWithSamBlog } from './utils/scrape';

class SummarizeDto {
  text: string;
}

class ChatBlogDto {
  prompt: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post('summarize')
  async summarize(@Body() body: SummarizeDto) {
    const slides = await MistralClient.summarizeToSlides(body.text);
    return { slides };
  }

  @Post('chat-sama')
  async chatBlog(@Body() body: ChatBlogDto) {
    const answer = await chatWithSamBlog(body.prompt);
    return { answer };
  }

@Get()
getStatus(): string {
  return this.appService.getStatus();
}

}
