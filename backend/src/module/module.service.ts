import { ForbiddenException, Injectable } from '@nestjs/common';
import { AddModuleDto } from './dto/add-module.dto';
import { Admin, Etudiant, Professeur } from 'src/user/user.entity';
import { ModuleRepository } from './module.repository';

@Injectable()
export class ModuleService {

  constructor(private _moduleRepository:ModuleRepository) {
    
  }
  
  addModule(addModuleDto: AddModuleDto, user: Admin | Etudiant | Professeur) {
    if(!(user instanceof Admin)) throw new ForbiddenException("Vous avez pas les droits de faire cette opération!");
    return this._moduleRepository.addModule(addModuleDto);
  }
}
 