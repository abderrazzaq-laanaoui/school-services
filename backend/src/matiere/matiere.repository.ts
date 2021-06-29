import { Module } from "src/module/module.entity";
import { Professeur } from "src/user/user.entity";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { AddMatiereDto } from "./dto/add-matiere.dto";
import { Matiere } from "./matiere.entity";
import * as _ from 'lodash';
import { BadRequestException } from "@nestjs/common";
@EntityRepository(Matiere)
export class MatiereRepository extends Repository<Matiere>{
   async addMatiere(addMatierelDto: AddMatiereDto) {
    const { nom, professeurId, coefficient, moduleId } = addMatierelDto;
    const professeurRepo = getRepository(Professeur);
    const professeur =  await professeurRepo.findOne({id:professeurId});
    if(!professeur) throw new BadRequestException(`Il y'a aucun professeur avec l'id ${professeurId}`);

    const moduleRepo = getRepository(Module);
    const module =  await moduleRepo.findOne({id:moduleId});
    if(!module) throw new BadRequestException(`Il y'a aucun module avec l'id ${professeurId}`);

    let matiere = new Matiere();
    matiere.nom = nom;
    matiere.coefficient = coefficient;
    matiere.professeur = professeur;
    matiere.module = module;

    return _.omit(await matiere.save(),'professeur','module');

    
    
    

  }

}