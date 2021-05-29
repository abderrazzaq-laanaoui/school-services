import { EntityRepository, Repository } from 'typeorm';
import { Classe } from './classe.entity';

@EntityRepository(Classe)
export class ClasseRepositoy extends Repository<Classe> {
  
}
