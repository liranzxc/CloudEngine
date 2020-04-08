import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to our songs library API\nEnter the swagger interface to view the operations\nRonnie, Eden, Liran';
  }
}
