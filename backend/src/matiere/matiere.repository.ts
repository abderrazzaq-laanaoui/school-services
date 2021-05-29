import { EntityRepository, Repository } from "typeorm";
import { Matiere } from "./matiere.entity";

@EntityRepository(Matiere)
export class MatiereRepository extends Repository<Matiere>{

}