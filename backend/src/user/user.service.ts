import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddStudentDto, AddUserDto } from './dto/addUser.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Admin, Etudiant, Professeur, User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUpStudent(addStudentDto: AddStudentDto): Promise<Partial<Etudiant>> {
    return this.userRepository.addStudent(addStudentDto);
  }

  async signUpProfesseur(addProfesseurDto: AddUserDto): Promise<Partial<Professeur>> {
    return this.userRepository.addProfesseur(addProfesseurDto);
  }

  async signUpAdmin(addAdminDto: AddUserDto): Promise<Partial<Admin>>{
    return this.userRepository.addAdmin(addAdminDto);
  }

  async signIn(authCredntialDto:AuthCredentialDto): Promise<string>{
    const username =  await this.userRepository.validateUserPassword(authCredntialDto);
    if(!username)
       throw new UnauthorizedException("Invalid Credentails");
  
    return username;
  }
}
