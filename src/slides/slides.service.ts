import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { MistralClient } from '../slides/utils/mistral';

@Injectable()
export class SlidesService {
  async generateSlidesFromFile(file: Express.Multer.File) {
    const content = readFileSync(file.path, 'utf-8');
    const slides = await MistralClient.summarizeToSlides(content);
    return slides;
  }
}