import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SemestreDto } from './dto/semestre.dto';
import { Semestre } from './semestre.entity';
import { SemestreService } from './semestre.service';

@Controller('semestre')
@UseGuards(AuthGuard('jwt'))
export class SemestreController {
  constructor(private semestreService: SemestreService) {}
  @Post()
  addSemestre(@Body(ValidationPipe) semestreDto: SemestreDto): Promise<Semestre> {
    const {nom}= semestreDto;
    return this.semestreService.addSemestre(nom);
  }
}
