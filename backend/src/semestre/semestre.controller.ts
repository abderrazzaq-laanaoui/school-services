import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { Admin, Etudiant, Professeur } from 'src/user/user.entity';
import { SemestreDto } from './dto/semestre.dto';
import { Semestre } from './semestre.entity';
import { SemestreService } from './semestre.service';

@Controller('semestre')
@UseGuards(AuthGuard())
export class SemestreController {
  constructor(private semestreService: SemestreService) {}
  @Post()
  addSemestre(@Body(ValidationPipe) semestreDto: SemestreDto): Promise<Semestre> {
    const {nom}= semestreDto;
    return this.semestreService.addSemestre(nom);
  }
  
  @Get()
  getSemestres(@GetUser() user: Etudiant | Admin | Professeur){
    return this.semestreService.getSemestres(user);
  }
  @Get(':id')
  getSemestre(@Param('id', ParseIntPipe) id: number, @GetUser() user: Etudiant | Admin | Professeur) {
    return this.semestreService.getSemestre(id, user);
  }
}
