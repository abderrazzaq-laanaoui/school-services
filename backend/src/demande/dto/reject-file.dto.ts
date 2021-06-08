import { IsInt } from "class-validator";

export class RejectDemandeDto{
  @IsInt()
  id: number;
}