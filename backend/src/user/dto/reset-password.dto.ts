import { IsInt, IsPositive } from "class-validator";

// reset password dto
export class ResetPasswordDto {
    
    @IsInt()
    @IsPositive()
    id: number;
}