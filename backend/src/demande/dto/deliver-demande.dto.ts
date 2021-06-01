import { IsInt } from "class-validator";

export class DeliverDemandeDto{
  @IsInt()
  id: number;
}