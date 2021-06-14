import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { Admin, Etudiant } from 'src/user/user.entity';
import { DemandeService } from './demande.service';
import { addDemandeDto } from './dto/add-demande.dto';

@Controller('demande')
@UseGuards(AuthGuard())
export class DemandeController {
  constructor(private demandeService: DemandeService) {}

  @Get()
  getDemandes(
    @GetUser() user: Admin | Etudiant
  ){    
    return this.demandeService.getDemandes(user);
  }

  @Post()
  addDemande(@Body(ValidationPipe) addDemandeDto: addDemandeDto, @GetUser() user: Etudiant) {
    return this.demandeService.addDemande(addDemandeDto, user);
  }

  @Patch(':id')
  deliverDemande(@Param('id', ParseIntPipe) id: number,@Body('file') file:string, @GetUser() user) {
    return this.demandeService.deliverDemande({ id, file }, user);
  }
  @Patch(':id')
  rejectDemande(@Param('id',ParseIntPipe) id: number, @GetUser() user){
    return this.demandeService.rejectDemande({ id }, user);
  }

  @Delete(':id')
  deleteDemande(@Param('id',ParseIntPipe) id: number, @GetUser() user){
    return this.demandeService.rejectDemande({ id }, user);
  }
}
