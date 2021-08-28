import { EntityRepository, Repository } from "typeorm";
import { NoteModule } from "./note-module.entity";

@EntityRepository(NoteModule)
export class NoteModuleRepository extends Repository<NoteModule> { }
