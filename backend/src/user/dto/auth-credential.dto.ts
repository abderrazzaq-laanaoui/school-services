import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';
export class AuthCredentialDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Le mot de passe doit contenir des lettres majuscules et minuscules ainsi que des chiffres ou des caractères spéciaux. !',
  })
  password: string;
}
