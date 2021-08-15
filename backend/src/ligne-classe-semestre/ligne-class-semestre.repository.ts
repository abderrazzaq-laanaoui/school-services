import { EntityRepository, Repository } from "typeorm";
import { LigneClasseSemestre } from "./ligne-classe-semestre.entity";

@EntityRepository(LigneClasseSemestre)
export class LigneClasseSemestreRepository extends Repository<LigneClasseSemestre>{

}