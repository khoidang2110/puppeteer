import { Controller } from '@nestjs/common';
import { AppService } from '@src/alpha/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
