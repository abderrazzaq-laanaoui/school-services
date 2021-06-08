import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class AddInfoDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  content: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  type: string;
}
