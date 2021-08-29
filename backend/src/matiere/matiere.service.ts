import { ForbiddenException, Injectable } from '@nestjs/common';
import { Admin, Etudiant, Professeur } from 'src/user/user.entity';
import { AddMatiereDto } from './dto/add-matiere.dto';
import { Matiere } from './matiere.entity';
import { MatiereRepository } from './matiere.repository';

@Injectable()
export class MatiereService {

  constructor(private matiereRepository : MatiereRepository){};
 
  getMatiers(user: Admin | Etudiant | Professeur) {
    if(user instanceof Professeur){
      return user.matieres;
    }
    if(user instanceof Admin){
      return this.matiereRepository.getAllMatieres();
    }
    if(user instanceof Etudiant){
      let matieres:Array<Matiere> = [];
      user.classe.lcs.semestre.modules.forEach(module => {
        matieres = matieres.concat(module.matieres)
      });
      return matieres;
    }
  }
  
  async addMatiere(addMatierelDto: AddMatiereDto, user: Admin | Etudiant | Professeur) {
    if (user instanceof Admin)  return await this.matiereRepository.addMatiere(addMatierelDto);
    throw new ForbiddenException('Vous avez pas les droits de faire cette opération!');

  }
}
