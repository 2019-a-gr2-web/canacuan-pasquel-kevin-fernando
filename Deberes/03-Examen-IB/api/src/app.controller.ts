import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Pacientes} from "./pacientes/bdd/pacientes";

@Controller('/examen')
export class AppController {
  constructor(private readonly appService: AppService) {
  }
  
}

