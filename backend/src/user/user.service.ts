import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AddStudentDto, AddUserDto } from './dto/addUser.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtPayload } from './auth/jwt-payload.interface';
import { Admin, Etudiant, Professeur, User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getUser(id: number, user: Etudiant | Admin | Professeur) {
    if (user instanceof Admin) {
      return await this.userRepository.getUser(id);
    } else {
      if (user.id === id) return await this.userRepository.getUser(id);
      else throw new NotFoundException("L'utilisateur demandé n'existe pas!");
    }
  }

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
    try {
      const payload: JwtPayload = await this.userRepository.validateUserPassword(authCredntialDto);
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid Credentails');
    }
  }
}
