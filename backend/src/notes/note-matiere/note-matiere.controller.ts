import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('note-matiere')
@UseGuards(AuthGuard())
export class NoteMatiereController {
}
