import { Module } from '@nestjs/common';
import { ClasseService } from './classe.service';
import { ClasseController } from './classe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasseRepositoy } from './classe.repository';

@Module({
  imports:[TypeOrmModule.forFeature([ClasseRepositoy])],
  providers: [ClasseService],
  controllers: [ClasseController]
})
export class ClasseModule {}
