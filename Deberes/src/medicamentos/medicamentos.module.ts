import { Module } from '@nestjs/common';
import {MedicamentosController} from "./medicamentos.controller";
import {MedicamentosService} from "./medicamentos.service";

@Module({
    imports: [],//Modulos
    controllers: [MedicamentosController], //Controladores
    providers: [MedicamentosService], //Servicios
    exports:[MedicamentosService] //Exportar servicios
})
export class MedicamentosModule {

}