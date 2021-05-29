import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from './note.controller';
import { NoteRepository } from './note.repository';
import { NoteService } from './note.service';

@Module({
  imports:[TypeOrmModule.forFeature([NoteRepository])],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
