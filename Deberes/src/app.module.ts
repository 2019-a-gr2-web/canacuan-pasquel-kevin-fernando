import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {MedicamentosModule} from "./medicamentos/medicamentos.module";
import {PacienteModule} from "./pacientes/paciente.module";

@Module({
  imports: [MedicamentosModule, PacienteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
