import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddStudentDto, AddUserDto } from './dto/addUser.dto';
import { Admin, Etudiant, Professeur, User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async addStudent(addStudentDto: AddStudentDto): Promise<Partial<Etudiant>> {
    return this.userRepository.addStudent(addStudentDto);
  }

  addProfesseur(addProfesseurDto: AddUserDto): Promise<Partial<Professeur>> {
    return this.userRepository.addProfesseur(addProfesseurDto);
  }

  addAdmin(addAdminDto: AddUserDto): Promise<Partial<Admin>>{
    return this.userRepository.addAdmin(addAdminDto);
  }
}
