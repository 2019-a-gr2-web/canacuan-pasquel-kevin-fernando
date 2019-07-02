import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "../../../node_modules/class-validator";
export class TragosCreateDto{
    @IsEmpty()
    id:number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    tipo: 'Ron'|'Vodka'|'Whiskey'|'Tequila'|'Puntas'|'Cervezas';

    @IsNotEmpty()
    @IsNumber()
    gradosAlcohol: number;

    @IsOptional()
    @IsDate()
    fechaCaducidad: Date;

    @IsOptional()
    @IsNumber()
    precio: number;

    @IsOptional()
    @IsNumber()
    distribuidorId: number;
}