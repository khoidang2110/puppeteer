import { PartialType } from '@nestjs/mapped-types';
import { CreateExampleDto } from '@src/alpha/example/dto/create-example.dto';

export class UpdateExampleDto extends PartialType(CreateExampleDto) {}
