import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { Admin } from 'src/user/user.entity';
import { AddInfoDto as AddClasseDto } from './dto/add-info.dto';
import {  Classe } from './classe.entity';
import { ClasseService } from './classe.service';

@Controller('class')
@UseGuards(AuthGuard())
export class InfoController {
  constructor(private _classeService: ClasseService){}

  @Get()
  getClasses():Promise<Classe[]>{
    return this._classeService.getClasses();
  }

   
  @Post()
  addClasse( @Body() addInfoDto: AddClasseDto, @GetUser() user: Admin):Promise<Classe>{
    return ;//TODO: save record
    }

  @Delete(':id')
  deleteInfo(@Param('id', ParseIntPipe) id:number, @GetUser() user: Admin){
    return this._classeService.deleteClasse(id, user)
  }

}
