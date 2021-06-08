import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';

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
  @IsEmail()
  email: string;

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
