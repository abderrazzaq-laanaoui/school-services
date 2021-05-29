import { EntityRepository, Repository } from 'typeorm';
import { LigneDocumentAffectation } from './ligne-document-affectation.entity';

@EntityRepository(LigneDocumentAffectation)
export class LigneDocumentAffectationRepository extends Repository<LigneDocumentAffectation> {}
