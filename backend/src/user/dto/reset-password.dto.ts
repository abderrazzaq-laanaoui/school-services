import { IsInt, IsPositive, IsNumber } from "class-validator";

// reset password dto
export class ResetPasswordDto {
    @IsNumber()
    @IsInt()
    @IsPositive()
    id: number;
}