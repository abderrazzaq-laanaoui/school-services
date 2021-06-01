import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Semestre } from './semestre.entity';
import { SemestreRepository } from './semestre.repository';

@Injectable()
export class SemestreService {
  constructor(
    @InjectRepository(SemestreRepository)
    private semestreRepository: SemestreRepository,
  ) {}


  async addSemestre(nom:string):Promise<Semestre>{
    try{
    return await this.semestreRepository.addSemestre(nom);
    }catch(e){
      if(e.code==="23505")
        throw new ConflictException(e.detail);
        
    }
  }
}
