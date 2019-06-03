import { Module } from '@nestjs/common';
import {PacienteController} from "./paciente.controller";
import {PacienteService} from "./paciente.service";
@Module({
    imports: [],//Modulos
    controllers: [PacienteController], //Controladores
    providers: [PacienteController], //Servicios
    exports:[PacienteController] //Exportar servicios
})
export class PacienteModule {

}