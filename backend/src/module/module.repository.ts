import { Module } from "./module.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Module)
export class ModuleRepository extends Repository<Module>{
}