import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    UseGuards,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { SlidesService } from './slides.service';
  import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
  
  @Controller('slides')
  export class SlidesController {
    constructor(private readonly slidesService: SlidesService) {}
  
    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
      return this.slidesService.generateSlidesFromFile(file);
    }
  }
  