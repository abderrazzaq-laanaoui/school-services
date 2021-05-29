import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { ModuleRepository } from './module.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleRepository])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
