import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { DemandeType } from '../demande-type.entity';

export class addDemandeDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  motif: string;

  @IsOptional()
  @IsString()
  type: DemandeType;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  autre: string;
}