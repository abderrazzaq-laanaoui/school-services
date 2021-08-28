import { EntityRepository, Repository } from "typeorm";
import { NoteMatiere } from "./note-matiere.entity";

@EntityRepository(NoteMatiere)
export class NoteMatiereRepository extends Repository<NoteMatiere> { }
