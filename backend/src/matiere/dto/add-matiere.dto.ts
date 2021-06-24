import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class AddMatiereDto{
  @IsNotEmpty()
  @IsString()
  nom:string;

  @IsNotEmpty()
  @IsNumber()
  @Max(1)
  @Min(0)
  coefficient:number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  professeurId:number;
  
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  moduleId:number;
  
}