import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()   //metodo http
  @HttpCode(200)
  postHello() {
    return 'Hola mundo en post';
  }

  @Get()    //metodo hhtp
  getHello(): string {
    return this.appService.getHello();
  }
}


/*
class usuario {
  atributoPublico;
  private atributoPrivado;
  protected atributoProtegido;

  constructor(atributoPublico, atributoPrivado, atributoProtegido) {
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido = atributoProtegido;
  }

  @metodoA()
  public metodoPublico(@parametroA() a) {}
  @metodoB()
  private metodoPrivado() {}
  protected metodoProtegido () {}

*/