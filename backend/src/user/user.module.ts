import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import{Admin, Etudiant, Professeur} from './user.entity'
@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, Etudiant, Professeur,Admin])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
