import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from 'src/user/get-user.decorator';
import { Admin, Etudiant } from 'src/user/user.entity';
import { DemandeRepository } from './demande.repository';
import { addDemandeDto } from './dto/add-demande.dto';
import { DeliverDemandeDto } from './dto/deliver-demande.dto';

@Injectable()
export class DemandeService {
  constructor(
    @InjectRepository(DemandeRepository)
    private demandeRepository: DemandeRepository,
  ) {}

  async getDemandes(user: Admin | Etudiant ) {
    return await this.demandeRepository.getDemandes(user);
  }

  async addDemande(addDemandeDto: addDemandeDto, user: Etudiant) {
    if (user instanceof Etudiant) return this.demandeRepository.addDemande(addDemandeDto, user);
    throw new UnauthorizedException('You do not have authorization to do this opreration');
  }

  async deliverDemande(deliverDemandeDto: DeliverDemandeDto, user: Admin) {
    if (user instanceof Admin) return await this.demandeRepository.deliverDemande(deliverDemandeDto, user);
    throw new UnauthorizedException('You do not have authorization to do this opreration');
  }
}
