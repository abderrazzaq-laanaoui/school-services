import { ForbiddenException, Injectable } from '@nestjs/common';
import { Admin, Etudiant, Professeur } from 'src/user/user.entity';
import { AddMatiereDto } from './dto/add-matiere.dto';
import { MatiereRepository } from './matiere.repository';

@Injectable()
export class MatiereService {
constructor(private matiereRepository : MatiereRepository){};

  async addMatiere(addMatierelDto: AddMatiereDto, user: Admin | Etudiant | Professeur) {
    if (!(user instanceof Admin)) throw new ForbiddenException('Vous avez pas les droits de faire cette opération!');
    return await this.matiereRepository.addMatiere(addMatierelDto);

  }
}
