import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddStudentDto, AddUserDto } from './dto/addUser.dto';
import { Admin, Etudiant, Professeur, User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/student')
  addEtudiant(@Body() addStudentDto: AddStudentDto): Promise<Partial<Etudiant>> {
    return this.userService.addStudent(addStudentDto);
  }

  @Post('/professeur')
  addProfesseur(@Body() addProfesseurDto: AddUserDto): Promise<Partial<Professeur>> {
    return this.userService.addProfesseur(addProfesseurDto);
  }

  @Post('/admin')
  addAdmin(@Body() addAdminDto: AddUserDto): Promise<Partial<Admin>> {
    return this.userService.addAdmin(addAdminDto);
  }
}
