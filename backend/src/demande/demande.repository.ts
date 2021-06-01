import { Admin, Etudiant } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Demande } from './demande.entity';
import { addDemandeDto } from './dto/add-demande.dto';
import * as _ from 'lodash';
import { DeliverDemandeDto } from './dto/deliver-demande.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@EntityRepository(Demande)
export class DemandeRepository extends Repository<Demande> {
  async getDemandes(user: Admin | Etudiant) {
    if (user instanceof Admin) {
      return await this.find({ isDelivred: false });
    }
    if (user instanceof Etudiant) {
      return await this.find({ where: { etudiant: user } });
    }
  }

  async addDemande(addDemandeDto: addDemandeDto, user: Etudiant) {
    const { motif, type, autre } = addDemandeDto;
    let demande = new Demande();
    demande.etudiant = user;
    demande.date = new Date();
    demande.motif = motif;
    if (type) demande.type = type;
    else demande.autre = autre;

    return _.pick(await demande.save(), 'id');
  }

  async deliverDemande(deliverDemandeDto: DeliverDemandeDto, user: Admin) {
    const { id } = deliverDemandeDto;
    let demande = await this.findOne(id);
    if (!demande) throw new NotFoundException(`No demande with id ${id} was found !`);
    if (demande.isDelivred) throw new BadRequestException(`Cannot deliver a document with id ${id}`);

    demande.isDelivred = true;
    demande.dateLaivraison = new Date();
    demande.livreur = user;
    demande.path = `demande_${id}_${demande.date.getFullYear()}.pdf`;
    return _.pick(await demande.save(), 'id');
  }
}
