import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, Matches, IsOptional, IsPhoneNumber, IsDate, IsDateString } from 'class-validator';

export class AddUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  cin: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  nom: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  avatar: string;

  // adresse
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  adresse: string;

  @IsString()
  @IsEmail()
  email: string;
  // birthday
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthday: Date;

  //tel
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10,11}$/)
  tel: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Le mot de passe doit contenir des lettres majuscules et minuscules ainsi que des chiffres ou des caractères spéciaux !',
  })
  password: string;
}

export class AddStudentDto extends AddUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(12)
  cne: string;
}
