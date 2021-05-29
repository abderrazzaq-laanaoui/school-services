import { EntityRepository } from "typeorm";
import { Evenement } from "./evenement.entity";

@EntityRepository(Evenement)
export class EvenementRepository{}