import { Injectable } from '@nestjs/common';
import { CreateExampleDto } from '@src/alpha/example/dto/create-example.dto';
import { UpdateExampleDto } from '@src/alpha/example/dto/update-example.dto';

@Injectable()
export class ExampleService {
  create(createExampleDto: CreateExampleDto) {
    return 'This action adds a new example';
  }

  findAll() {
    return `This action returns all example NO RUNNER`;
  }

  findOne(id: number) {
    return `This action returns a #${id} example`;
  }

  update(id: number, updateExampleDto: UpdateExampleDto) {
    return `This action updates a #${id} example`;
  }

  remove(id: number) {
    return `This action removes a #${id} example`;
  }
}
