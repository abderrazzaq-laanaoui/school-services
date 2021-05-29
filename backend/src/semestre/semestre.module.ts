import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemestreController } from './semestre.controller';
import { SemestreRepository } from './semestre.repository';
import { SemestreService } from './semestre.service';

@Module({
  imports:[TypeOrmModule.forFeature([SemestreRepository])],
  controllers: [SemestreController],
  providers: [SemestreService]
})
export class SemestreModule {}
