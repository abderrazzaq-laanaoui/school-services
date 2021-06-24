import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class AddModuleDto{
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nom:string;


  @IsNumber()
  @IsInt()
  @IsPositive()
  semestreId:number;
}