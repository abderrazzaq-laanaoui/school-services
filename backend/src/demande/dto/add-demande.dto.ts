import { IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class addDemandeDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  motif: string;

  @IsOptional()
  @IsString()
  @IsIn( ["Attestation de scolarité", "Attestation de réussite","Bulletin","Diplôme","Convention de stage","Assurance","Autre"])
  type: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  autre: string;
}