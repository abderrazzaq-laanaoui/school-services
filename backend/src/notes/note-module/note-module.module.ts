import { Module } from '@nestjs/common';
import { NoteModuleService } from './note-module.service';
import { NoteModuleController } from './note-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModuleRepository } from './note-module.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NoteModuleRepository])],
  providers: [NoteModuleService],
  controllers: [NoteModuleController]
})
export class NoteModuleModule {}
