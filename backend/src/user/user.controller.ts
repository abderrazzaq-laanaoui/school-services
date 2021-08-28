import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddStudentDto, AddUserDto } from './dto/addUser.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { GetUser } from './get-user.decorator';
import { Admin, Etudiant, Professeur } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}


  @UseGuards(AuthGuard())
  @Get('/list')
  getUsers(@GetUser() user: Etudiant | Admin | Professeur) {
    return this.userService.getUsers(user);
  }
  
  @UseGuards(AuthGuard())
  @Get('/professeurs')
  getProfesseurs( @GetUser() user: Etudiant | Admin | Professeur): Promise<any[]> {
    return this.userService.getProfesseurs(user);
  }
  
  //get avatar
  @UseGuards(AuthGuard())
  @Get('/avatar/:id')
  getAvatar(@Param('id', ParseIntPipe) id: number,@GetUser() user: Etudiant | Admin | Professeur){
    return this.userService.getAvatar(id,user);
  }
  
  @UseGuards(AuthGuard())
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number, @GetUser() user: Etudiant | Admin | Professeur) {
    return this.userService.getUser(id, user);
  }
  //endpoint to reset password using patch
  @UseGuards(AuthGuard())
  @Patch('/password')
  resetPassword(@Body(ValidationPipe) resetPasswordDto: ResetPasswordDto,  @GetUser() user: Etudiant | Admin | Professeur): Promise<{ message: string }> {
    return this.userService.resetPassword(resetPasswordDto.id,user);
  } 


  
  //update password end point using path verb
  @UseGuards(AuthGuard())
  @Patch('/password/:id')
  updatePassword(@Param('id', ParseIntPipe) id: number,@Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto, @GetUser() user: Etudiant | Admin | Professeur){
    console.log("data => ",updatePasswordDto);
    
    return this.userService.updatePassword(id,updatePasswordDto,user);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number,@Body() userData, @GetUser() user: Etudiant | Admin | Professeur){
    return this.userService.updateUser(id,userData,user);
  }
  
  @UseGuards(AuthGuard())
  @Patch('/avatar/:id')
  updateAvatar(@Param('id', ParseIntPipe) id: number,@Body('avatar') avatar:string, @GetUser() user: Etudiant | Admin | Professeur){
    return this.userService.updateAvatar(id,avatar,user);
  }
  
  @UseGuards(AuthGuard())
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number,@GetUser() user: Etudiant | Admin | Professeur){
    return this.userService.deleteUser(id,user);
  }
  


  @UseGuards(AuthGuard())
  @Post('/etudiant')
  addEtudiant(@Body(ValidationPipe) addStudentDto: AddStudentDto, @GetUser() user: Etudiant | Admin | Professeur): Promise<Partial<Etudiant>> {
    return this.userService.signUpStudent(addStudentDto,user);
  }

  @UseGuards(AuthGuard())
  @Post('/professeur')
  addProfesseur(@Body(ValidationPipe) addProfesseurDto: AddUserDto, @GetUser() user: Etudiant | Admin | Professeur): Promise<Partial<Professeur>> {
    return this.userService.signUpProfesseur(addProfesseurDto,user);
  }
  

  @UseGuards(AuthGuard())
  @Post('/admin')
  addAdmin(@Body(ValidationPipe) addAdminDto: AddUserDto): Promise<Partial<Admin>> {
    return this.userService.signUpAdmin(addAdminDto);
  }

  
  @Post('/login')
  signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    return this.userService.signIn(authCredentialDto);
  }
}
