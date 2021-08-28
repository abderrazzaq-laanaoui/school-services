import { Module } from '@nestjs/common';
import { ClasseService } from './classe.service';
import { InfoController } from './classe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasseRepository } from './classe.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ClasseRepository]),UserModule    
  ],
  providers: [ClasseService],
  controllers: [InfoController]
})
export class ClasseModule {}
