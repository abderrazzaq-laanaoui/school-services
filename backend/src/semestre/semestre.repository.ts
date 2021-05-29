import { EntityRepository, Repository } from "typeorm";
import { Semestre } from "./semestre.entity";

@EntityRepository(Semestre)
export class SemestreRepository extends Repository<Semestre>{} 