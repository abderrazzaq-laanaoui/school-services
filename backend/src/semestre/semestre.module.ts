import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { SemestreController } from './semestre.controller';
import { SemestreRepository } from './semestre.repository';
import { SemestreService } from './semestre.service';

@Module({
  imports:[TypeOrmModule.forFeature([SemestreRepository]), UserModule],
  controllers: [SemestreController],
  providers: [SemestreService]
})
export class SemestreModule {}
