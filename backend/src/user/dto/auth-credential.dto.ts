import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';
export class AuthCredentialDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password should contains UpperCase and LowerCase letters and also numbers or special caracters !',
  })
  password: string;
}
