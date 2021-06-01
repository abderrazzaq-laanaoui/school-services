import { IsString, IsUppercase, MaxLength } from "class-validator";

export class SemestreDto{
  @IsString()
  @IsUppercase()
  @MaxLength(10)
  nom:string;
}