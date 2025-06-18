import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { SlidesController } from './slides/slides.controller';
import { SlidesService } from './slides/slides.service';

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [AppController, SlidesController],
  providers: [AppService, SlidesService],
})
export class AppModule {}
