import { IsInt } from "class-validator";

export class UpdateDemandeDto{
  @IsInt()
  id: number;
}