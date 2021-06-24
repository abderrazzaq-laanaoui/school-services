import { IsNotEmpty, IsString, IsUppercase, MaxLength } from "class-validator";

export class SemestreDto{
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  nom:string;
}