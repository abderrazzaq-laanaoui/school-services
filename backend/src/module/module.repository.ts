import { Module } from "./module.entity";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { AddModuleDto } from "./dto/add-module.dto";
import { Semestre } from "src/semestre/semestre.entity";
import * as _ from 'lodash';
import { BadRequestException } from "@nestjs/common";

@EntityRepository(Module)
export class ModuleRepository extends Repository<Module>{
  async addModule(addModuleDto: AddModuleDto) {
    const { nom, semestreId} = addModuleDto;
    const semestreRepo = getRepository(Semestre);

    const semestre = await semestreRepo.findOne({id:semestreId});
    if(!semestre) throw new BadRequestException(`Il y'a aucune semestre avec l'id ${semestreId}`);

    let module = new Module();
    module.nom = nom;
    module.semestre = semestre;    
    return _.omit(await module.save(),'semestre');
    
    
  }
}