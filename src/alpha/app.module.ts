import { Module } from '@nestjs/common';
import { AppController } from '@src/alpha/app.controller';
import { AppService } from '@src/alpha/app.service';

import { ExampleModule } from '@src/alpha/example/example.module';

@Module({
  imports: [ExampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
