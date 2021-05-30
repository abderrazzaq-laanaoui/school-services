import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddStudentDto, AddUserDto } from './dto/addUser.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Admin, Etudiant, Professeur } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/student')
  addEtudiant(@Body(ValidationPipe) addStudentDto: AddStudentDto): Promise<Partial<Etudiant>> {
    return this.userService.signUpStudent(addStudentDto);
  }

  @Post('/professeur')
  addProfesseur(@Body(ValidationPipe) addProfesseurDto: AddUserDto): Promise<Partial<Professeur>> {
    return this.userService.signUpProfesseur(addProfesseurDto);
  }

  @Post('/admin')
  addAdmin(@Body(ValidationPipe) addAdminDto: AddUserDto): Promise<Partial<Admin>> {
    return this.userService.signUpAdmin(addAdminDto);
  }

  @Post('/signIn')
  signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    return this.userService.signIn(authCredentialDto);
  }

}
