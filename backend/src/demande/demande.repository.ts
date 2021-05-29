import { EntityRepository, Repository } from "typeorm";
import { Demande } from "./demande.entity";

@EntityRepository(Demande)
export class DemandeRepository extends Repository<Demande>{

}