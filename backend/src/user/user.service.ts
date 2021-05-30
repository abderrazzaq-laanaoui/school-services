import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AddStudentDto, AddUserDto } from './dto/addUser.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { Admin, Etudiant, Professeur, User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUpStudent(addStudentDto: AddStudentDto): Promise<Partial<Etudiant>> {
    return this.userRepository.addStudent(addStudentDto);
  }

  async signUpProfesseur(addProfesseurDto: AddUserDto): Promise<Partial<Professeur>> {
    return this.userRepository.addProfesseur(addProfesseurDto);
  }

  async signUpAdmin(addAdminDto: AddUserDto): Promise<Partial<Admin>> {
    return this.userRepository.addAdmin(addAdminDto);
  }

  async signIn(authCredntialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    const email = await this.userRepository.validateUserPassword(authCredntialDto);
    if (!email) throw new UnauthorizedException('Invalid Credentails');

    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
