import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class AddArticleDto{
  @IsString()
  @IsNotEmpty()
  title:string;

  @IsString()
  @IsNotEmpty()
  content:string;

  @IsInt()
  @IsPositive()
  matiere:number;
}