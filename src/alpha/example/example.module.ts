import { Module } from '@nestjs/common';
import { ExampleService } from '@src/alpha/example/example.service';
import { ExampleController } from '@src/alpha/example/example.controller';

@Module({
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
