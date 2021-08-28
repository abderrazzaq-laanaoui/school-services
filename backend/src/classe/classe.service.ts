import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin } from 'src/user/user.entity';
import { AddInfoDto } from './dto/add-info.dto';
import { Classe } from './classe.entity';
import { ClasseRepository } from './classe.repository';

@Injectable()
export class ClasseService {
  
  constructor(private _classeRepository: ClasseRepository) {}

  async getClasses(): Promise<Classe[]> {
    return this._classeRepository.find();
  }

  
  //get classe with an id
  async getClasse(id: number): Promise<Classe> {
    return await this._classeRepository.findOne(id);
  }
  
  async addClasse(addInfoDto:AddInfoDto, user: Admin){
    if(user.type ==="Admin")
      return ;// TODO: add record
    throw new ForbiddenException("Vous n'avez pas les droit pour faire cette operation!");
    
  };
  async deleteClasse(id: number, user : Admin) {
    if(user instanceof Admin)
      return await this._classeRepository.delete(id);
    throw new ForbiddenException("Vous n'avez pas les droit pour faire cette operation!");
    
  }
}
