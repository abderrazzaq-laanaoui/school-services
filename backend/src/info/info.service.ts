import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin } from 'src/user/user.entity';
import { AddInfoDto } from './dto/add-info.dto';
import { Info } from './info.entity';
import { InfoRepository } from './info.repository';

@Injectable()
export class InfoService {
  constructor(private _infoRepository: InfoRepository) {}

  async getInfos(): Promise<Info[]> {
    return this._infoRepository.find();
  }
  
  async addInfo(addInfoDto:AddInfoDto, user: Admin){
    if(user.type ==="Admin")
      return this._infoRepository.addInfo(addInfoDto)
    throw new ForbiddenException("Vous n'avez pas les droit pour faire cette operation!");
    
  };
}
