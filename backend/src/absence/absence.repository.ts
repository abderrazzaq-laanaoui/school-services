import { EntityRepository, Repository } from "typeorm";
import { Absence } from "./absence.entity";

@EntityRepository(Absence)
export class AbsenceRepository extends Repository<Absence>{
  
}