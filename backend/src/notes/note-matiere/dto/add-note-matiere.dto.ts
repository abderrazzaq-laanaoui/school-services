import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class addNoteMatiereDto {
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    cc: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    tp: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    ef: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    nfn: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    nfr: number;
}