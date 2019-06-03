import { Module } from '@nestjs/common';
import {PacienteController} from "./paciente.controller";
import {PacienteService} from "./paciente.service";
@Module({
    imports: [],//Modulos
    controllers: [PacienteController], //Controladores
    providers: [PacienteService], //Servicios
    exports:[PacienteService] //Exportar servicios
})
export class PacienteModule {

}