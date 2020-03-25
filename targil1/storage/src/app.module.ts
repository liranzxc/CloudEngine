import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';
import { SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [StorageModule,SwaggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
