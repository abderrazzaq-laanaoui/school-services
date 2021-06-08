import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoRepository } from './info.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([InfoRepository]),
    UserModule
    
  ],
  providers: [InfoService],
  controllers: [InfoController]
})
export class InfoModule {}
