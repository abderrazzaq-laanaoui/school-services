import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { ModuleRepository } from './module.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleRepository]), UserModule],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
