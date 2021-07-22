import { IsString, Matches, MaxLength, MinLength } from "class-validator";

//update password dto
export class UpdatePasswordDto {
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'Le mot de passe doit contenir des lettres majuscules et minuscules ainsi que des chiffres ou des caractères spéciaux. !',
    })
    old_password: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'Le mot de passe doit contenir des lettres majuscules et minuscules ainsi que des chiffres ou des caractères spéciaux. !',
    })
    new_password: string;
}