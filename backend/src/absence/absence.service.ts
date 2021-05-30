import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { AbsenceRepository } from './absence.repository';

@Injectable()
export class AbsenceService {
  constructor(
    @InjectRepository(AbsenceRepository)
    private absenceRepository: AbsenceRepository
  ) {}
}
