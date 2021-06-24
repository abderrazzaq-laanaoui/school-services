import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { Admin, Etudiant, Professeur } from 'src/user/user.entity';
import { AddMatiereDto } from './dto/add-matiere.dto';
import { MatiereService } from './matiere.service';

@Controller('matiere')
@UseGuards(AuthGuard())
export class MatiereController {
  constructor(private matiereService: MatiereService){};
  
  @Post()
  addModule(@Body(ValidationPipe) addMatierelDto: AddMatiereDto, @GetUser() user: Admin | Etudiant | Professeur) {
    return this.matiereService.addMatiere(addMatierelDto, user);
  }
}
