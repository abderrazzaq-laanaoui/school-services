import { EntityRepository, Repository } from "typeorm";
import { Epreuve } from "./epreuve.entity";

@EntityRepository(Epreuve)
export class EpreuveRepository extends Repository<Epreuve>{

}