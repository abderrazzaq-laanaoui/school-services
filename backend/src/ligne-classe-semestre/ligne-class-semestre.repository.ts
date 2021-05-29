import { EntityRepository, Repository } from "typeorm";
import { LigneClasseSemstre } from "./ligne-classe-semestre.entity";

@EntityRepository(LigneClasseSemstre)
export class LigneClasseSemestreRepository extends Repository<LigneClasseSemstre>{

}