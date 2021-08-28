import { Module } from '@nestjs/common';
import { NoteMatiereService } from './note-matiere.service';
import { NoteMatiereController } from './note-matiere.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteMatiereRepository } from './note-matiere.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([NoteMatiereRepository]),UserModule],
  providers: [NoteMatiereService],
  controllers: [NoteMatiereController]
})
export class NoteMatiereModule {}
