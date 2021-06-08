import { IsInt,  IsString } from "class-validator";

export class UpdateDemandeDto{
  @IsInt()
  id: number;

  @IsString()
  file:string;
}