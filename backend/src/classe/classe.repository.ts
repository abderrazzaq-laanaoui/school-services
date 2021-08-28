import { EntityRepository, Repository } from "typeorm";
import { Classe } from "./classe.entity";

@EntityRepository(Classe)
export class ClasseRepository extends Repository<Classe>{
}