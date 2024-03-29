import { Admin, Etudiant } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Demande } from './demande.entity';
import { addDemandeDto } from './dto/add-demande.dto';
import * as _ from 'lodash';
import {  UpdateDemandeDto } from './dto/upload-demande.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RejectDemandeDto } from './dto/reject-file.dto';

@EntityRepository(Demande)
export class DemandeRepository extends Repository<Demande> {
  rejectDemande(rejectDemandeDto: RejectDemandeDto) {
    throw new Error('Method not implemented.');
  }
  async getDemande(id:number):Promise<Demande>{
    let demande = await this.findOne(id);
    if (!demande) throw new NotFoundException(`No demande with id ${id} was found !`);
    return demande;
  }
  async getDemandes(user: Admin | Etudiant) {
    if (user instanceof Admin) {
      return await this.find({ isDelivred: false });
    }
    if (user instanceof Etudiant) {
      let res = await this.find({ where: { etudiant: user } });
      return _.map(res, d=> _.pick(d, 'id','motif','date','type','autre','isDelivred','file'));
      
    }
  }

  async addDemande(addDemandeDto: addDemandeDto, user: Etudiant) {
    const { motif, type, autre } = addDemandeDto;
    let demande = new Demande();
    demande.etudiant = user;
    demande.date = new Date();
    demande.motif = motif;
    demande.type = type;
    demande.autre = autre;

    return _.pick(await demande.save(), 'id','motif','date','type','autre','isDelivred','file');
  }

  async deliverDemande(deliverDemandeDto: UpdateDemandeDto, user: Admin) {
    let demande = await this.getDemande(deliverDemandeDto.id);
    if (demande.isDelivred ) throw new BadRequestException(`Cannot deliver a document with id ${demande.id}`);

    demande.isDelivred = true;
    demande.dateLaivraison = new Date();
    demande.livreur = user;
    demande.file = deliverDemandeDto.file;
    return _.pick(await demande.save(), 'id');
  }
  
  async deleteDemande(rejectDemandeDto: RejectDemandeDto){
    const {id} = rejectDemandeDto;
    return await this.delete({id});
  }
}
