import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddStudentDto, AddUserDto } from './dto/addUser.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { Admin, Etudiant, Professeur, User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number, @GetUser() user: Etudiant | Admin | Professeur) {
    return this.userService.getUser(id, user);
  }

  @UseGuards(AuthGuard())
  @Post('/etudiant')
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
