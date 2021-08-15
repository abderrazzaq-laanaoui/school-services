import { Post, UseGuards, Controller, Body, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { Admin, Etudiant, Professeur } from 'src/user/user.entity';
import { AddModuleDto } from './dto/add-module.dto';
import { ModuleService } from './module.service';

@Controller('module')
@UseGuards(AuthGuard('jwt'))
export class ModuleController {

  constructor(private moduleService: ModuleService){}
  @Post()
  addModule(@Body(ValidationPipe) addModuleDto: AddModuleDto, @GetUser() user: Admin | Etudiant | Professeur)
  {    
    return this.moduleService.addModule(addModuleDto,user);
  }
}
