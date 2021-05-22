import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
