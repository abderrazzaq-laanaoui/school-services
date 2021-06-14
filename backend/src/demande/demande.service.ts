import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Etudiant } from 'src/user/user.entity';
import { DemandeRepository } from './demande.repository';
import { addDemandeDto } from './dto/add-demande.dto';
import { RejectDemandeDto } from './dto/reject-file.dto';
import { UpdateDemandeDto } from './dto/upload-demande.dto';

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
    throw new ForbiddenException("Vous n'avez pas les droits d'accées à cette opreration");
  }

  async deliverDemande(deliverDemandeDto: UpdateDemandeDto, user: Admin) {
    if (user instanceof Admin) return await this.demandeRepository.deliverDemande(deliverDemandeDto, user);
     throw new ForbiddenException("Vous n'avez pas les droits d'accées à cette opreration");
  }
  async rejectDemande(rejectDemandeDto: RejectDemandeDto, user: Admin | Etudiant) {
    if (user instanceof Admin) return await this.demandeRepository.rejectDemande(rejectDemandeDto);
    if((await this.demandeRepository.findOne(rejectDemandeDto.id)).etudiant.id === user.id) return this.demandeRepository.delete(rejectDemandeDto.id); 
    
  }
}
