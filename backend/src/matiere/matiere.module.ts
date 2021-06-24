import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { MatiereController } from './matiere.controller';
import { MatiereRepository } from './matiere.repository';
import { MatiereService } from './matiere.service';

@Module({
  imports:[TypeOrmModule.forFeature([MatiereRepository]),
  UserModule],
  controllers: [MatiereController],
  providers: [MatiereService]
})
export class MatiereModule {}
