import { EntityRepository, Repository } from "typeorm";
import { Calendrier } from "./calendrier.entity";

@EntityRepository(Calendrier)
export class CalendrierRepository extends Repository<Calendrier>{
  
}