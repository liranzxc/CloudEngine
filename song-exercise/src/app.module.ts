import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemosModule } from './demos/demos.module';


@Module({
  imports: [DemosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
