import {Body, Controller, Delete, Get, Headers, HttpCode, Param, Post, Put, Query, Request, Response} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

// DEBER CALCULADORA

  @Get('/sumarDosNumeros')
  @HttpCode(200)
  sumaDosNumeros(@Headers() headers,
                 @Response() response,
                 @Request() request) {
    if (headers.numerouno && headers.numerodos) {
      const cookie = request.cookies;
      const numero1 = Number(headers.numerouno);
      const numero2 = Number(headers.numerodos);
      const totalSuma = numero1 + numero2;
      response.cookie('nombreUsuario', 'Kevin');
      return response.send({resultado: totalSuma.toString(),
        nombreUsuario: cookie.nombreUsuario});
    } else {

     return response.status(400).send({
       mensajeError: 'ERROR... no existen numeros para SUMAR',
       error: 400,
     });
    }
  }

  @Post('/restarDosNumeros')
  @HttpCode(201)
  restaDosNumeros(@Body() bodyParams,
                  @Response() response,
                  @Request() request) {
    if (bodyParams.numeroUno && bodyParams.numeroDos) {
      const cookie = request.cookies;
      const numero1 = Number(bodyParams.numeroUno);
      const numero2 = Number(bodyParams.numeroDos);
      const totalResta = numero1 - numero2;
      response.cookie('nombreUsuario', 'Fernando');
      return response.send({resultado: totalResta.toString(),
        nombreUsuario: cookie.nombreUsuario});
    } else {
      return response.status(400).send({
        mensaje: 'ERROR... no existen numeros para RESTAR',
        error: 400,
      });
    }
  }

  @Put('/multiplicarDosNumeros')
  @HttpCode(202)
  multiplicacion(@Query() queryParams,
                 @Response() response,
                 @Request() request) {
    if (queryParams.numeroUno && queryParams.numeroDos) {
      const cookie = request.cookies;
      const numero1 = Number(queryParams.numeroUno);
      const numero2 = Number(queryParams.numeroDos);
      const totalMultiplicacion = numero1 * numero2;
      response.cookie('nombreUsuario', 'Kevin Fernando');
      return response.send({resultado: totalMultiplicacion.toString(),
        nombreUsuario: cookie.nombreUsuario});
    } else {
      return response.status(400).send({
        mensaje: 'ERROR... no existen numeros para MULTIPLICAR',
        error: 400,
      });
    }
  }

  @Delete('/dividirDosNumeros')
  @HttpCode(203)
  dividirDosNumeros(
    // @Headers() cabeceras,
    @Query() queryParams,
    @Body() bodyParams,
    @Response() response,
    @Request() request,
  ) {
    if (queryParams.numeroUno && bodyParams.numeroDos) {
      const cookie = request.cookies;
      const numero1 = Number(queryParams.numeroUno);
      const numero2 = Number(bodyParams.numeroDos);
      const totalDivision = numero1 / numero2;
      response.cookie('nombreUsuario', 'KFCP');
      return response.send({resultado: totalDivision.toString(),
        nombreUsuario: cookie.nombreUsuario});
    } else {
      return response.status(400).send({
        mensaje: 'ERROR.. no existen numeros para DIVIDIR' +
          ' o se envio 0',
        error: 400,
      });
    }
  }
}
