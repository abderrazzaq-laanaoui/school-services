import { IsString,IsInt } from "class-validator";

export class AddAbsenceDto {
  @IsString()
  motif: string;

  @IsString()
  description: string;

  @IsInt()
  etudiant: number;

  @IsInt()
  seance: number;
}
