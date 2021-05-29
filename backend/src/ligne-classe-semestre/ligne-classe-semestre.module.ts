import { Module } from '@nestjs/common';
import { LigneClasseSemestreService } from './ligne-classe-semestre.service';
import { LigneClasseSemestreController } from './ligne-classe-semestre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LigneClasseSemestreRepository } from './ligne-class-semestre.repository';

@Module({
  imports:[TypeOrmModule.forFeature([LigneClasseSemestreRepository])],
  providers: [LigneClasseSemestreService],
  controllers: [LigneClasseSemestreController]
})
export class LigneClasseSemestreModule {}
