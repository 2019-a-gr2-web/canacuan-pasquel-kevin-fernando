import {Controller, Delete, Get, Headers, HttpCode, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';



@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()   //metodo http
  @HttpCode(200)
  postHello() {
    return 'Hola mundo en post';
  }

  //@Get('/hello-world')    //metodo hhtp
  //getHello(): string {
  //  return this.appService.getHello();
  //}

  // ----------------------

    @Get('/adivina')
    adivina(@Headers() headers): string {

      console.log('Headers', headers);
      const numeroRandomico = Math.round(Math.random()*10);
      const numeroDeCabecera = Number(headers.numero);

      if (numeroDeCabecera == numeroRandomico) {
          return 'Ok';
      } else {
          return ' :( ';
      }
    }

    /*
    Segmento inicial -> /api
    4 acciones:
      1) Segmento accion: 'hello-world' -> GET
      2) Segmento accion: 'hola mundo' -> POST
      3) Segmento accion: '' -> PUT
      4) Segmento accion: '' -> DELETE
     */

  @Get('/hello-world')
  helloWorld(): string {
    return 'Hello World'
  }

  @Post('/hola-mundo')
  holaMundo() {
    return 'Hola Mundo'
  }

  @Put('/salut-monde')
  salutMonde() {
    return 'Salut Monde'
  }

  @Delete('/hallo-welt')
  halloWelt(): string {
    return 'Hallo Welt'
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

const json = [
    {
    "llave":"valor",
    "key":"value",
    "nombre":"Kevin",
    "edad":24,
    sueldo:10.50,
    "casado":false,
    "hijos":null,
    mascotas:[
        "cachetes",
        1,
        1.10,
        false,
        null,
        {
            "nombre":"JACK"
        }
    ]
}
];

let objeto:any = {
    propiedad:'valor',
    propiedadDos: 'valor2'
};

objeto.propiedad;        // -> valor
objeto.propiedadDos;     // -> valor 2

// Agregar propiedades a un objeto
objeto.propiedadTres = 'valor3';
objeto['propiedadTres'] = 'valor 3';

//Eliminar una propiedad
delete objeto.propiedadTres;        // -> forma peligros
objeto.propiedadTres = undefined;    // -> forma segura

