import { EntityRepository, Repository } from 'typeorm';
import { Semestre } from './semestre.entity';

@EntityRepository(Semestre)
export class SemestreRepository extends Repository<Semestre> {
  async addSemestre(nom: string): Promise<Semestre> {
    let semestre = new Semestre();
    semestre.nom = nom;
    return await semestre.save();
  }
}
