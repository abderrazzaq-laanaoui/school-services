import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Etudiant } from 'src/user/user.entity';
import { DemandeRepository } from './demande.repository';
import { addDemandeDto } from './dto/add-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';

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

  async deliverDemande(deliverDemandeDto: UpdateDemandeDto, user: Admin) {
    if (user instanceof Admin) return await this.demandeRepository.deliverDemande(deliverDemandeDto, user);
    throw new UnauthorizedException('You do not have authorization to do this opreration');
  }
  async rejectDemande(rejectDemandeDto: UpdateDemandeDto, user: Admin | Etudiant) {
    if (user instanceof Admin) return await this.demandeRepository.deleteDemande(rejectDemandeDto);
    if(user.demandes.find(d => d.id === rejectDemandeDto.id)) return; 
  }
}
