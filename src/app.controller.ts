import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MistralClient } from './utils/mistral';

class SummarizeDto {
  text: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('summarize')
  async summarize(@Body() body: SummarizeDto) {
    const slides = await MistralClient.summarizeToSlides(body.text);
    return { slides };
  }
}
