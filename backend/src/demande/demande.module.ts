import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { DemandeType } from './demande-type.entity';
import { DemandeController } from './demande.controller';
import { DemandeRepository } from './demande.repository';
import { DemandeService } from './demande.service';

@Module({
  imports: [TypeOrmModule.forFeature([DemandeRepository, DemandeType]), UserModule],
  controllers: [DemandeController],
  providers: [DemandeService],
})
export class DemandeModule {}
