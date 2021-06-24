import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Semestre } from './semestre.entity';
import { SemestreRepository } from './semestre.repository';
import { Admin, Etudiant, Professeur } from 'src/user/user.entity';

@Injectable()
export class SemestreService {
  getSemestres(user: Etudiant | Admin | Professeur) {
    if(!(user instanceof Admin)) throw new ForbiddenException("Vous avez pas les droits de faire cette opération!");
    return this.semestreRepository.find({});
  }
  getSemestre(id: number, user: any) {
    if(!(user instanceof Admin)) throw new ForbiddenException("Vous avez pas les droits de faire cette opération!");    
    return this.semestreRepository.findOne({id});
  }
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
