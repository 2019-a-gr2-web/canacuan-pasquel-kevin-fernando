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
      const cookies = request.cookies;
      const cookieSig = request.signedCookies;
      if (!cookieSig.puntos) {
        response.cookie('puntos', 100, { signed: true });
      }
      const n1 = Number(headers.numero1);
      const n2 = Number(headers.numero2);
      if (!cookies.usuario) {
        response.cookie('usuario', 'Kevin');
      }
      const suma = n1 + n2;
      const tIntentos = cookieSig.puntos - suma;

      if (tIntentos <= 0) {
        const res = {
          resultado: `Resultado de la suma es: ${suma}`,
          usuario: `Usuario: ${cookies.usuario}`,
          mensaje: `Se acabaron los puntos`};
        response.cookie('puntos', tIntentos, { signed: true });
        response.send(res);
      } else {
        const res = {
          resultado: `Resultado de la suma es: ${suma}`,
          usuario: `Usuario: ${cookies.usuario}`,
          mensaje: `Tiene ${tIntentos} puntos disponibles `};
        response.cookie('puntos', tIntentos, { signed: true });
        return response.send(res);
      }
    } else {
      return response.status(400).send({
        mensajeError: 'ERROR... no existen numeros para SUMAR',
        error: 400,
      });
    }
    /*
  if (headers.numerouno && headers.numerodos) {
    //const cookie = request.cookies;
    const cookieSegura = request.signedCookies;

    if (!cookieSegura.intentos) {
      response.cookieSegura('valor', 100, {signed: true});
    }
    const numero1 = Number(headers.numerouno);
    const numero2 = Number(headers.numerodos);
    const totalSuma = numero1 + numero2;

    if (totalSuma <= cookieSegura.valor) {
      response.cookieSegura('valor', cookieSegura.valor - totalSuma, {signed: true})
      if (cookieSegura.valor == 0) {
        response.cookieSegura('nombreUsuario', 'Kevin', {signed: true});
        return response.send({resultado: totalSuma.toString(),
          nombreUsuario: cookieSegura.nombreUsuario,
          mensaje: 'Se le agotaron los puntos'});
      } else {
        response.cookieSegura('nombreUsuario', 'Kevin', {signed: true});
        return response.send({resultado: totalSuma.toString(),
          nombreUsuario: cookieSegura.nombreUsuario,
          mensaje: `Le quedan: ${cookieSegura.valor} puntos`});
      }
    } else {
      response.cookieSegura('nombreUsuario', 'Kevin', {signed: true});
      return response.send({resultado: totalSuma.toString(),
        nombreUsuario: cookieSegura.nombreUsuario,
        mensaje: 'Excede los puntos'});
    }
  } else {
   return response.status(400).send({
     mensajeError: 'ERROR... no existen numeros para SUMAR',
     error: 400,
   });
  } */
  }

  @Post('/restarDosNumeros')
  @HttpCode(201)
  restaDosNumeros(@Body() bodyParams,
                  @Response() response,
                  @Request() request) {

    if (bodyParams.numeroUno && bodyParams.numeroDos) {
      const cookies = request.cookies;
      const cookieSig = request.signedCookies;
      if (!cookieSig.puntos) {
        response.cookie('puntos', 100, { signed: true });
      }
      const n1 = Number(bodyParams.numeroUno);
      const n2 = Number(bodyParams.numeroDos);
      if (!cookies.usuario) {
        response.cookie('usuario', 'Fernando');
      }
      const resta = n1 - n2;
      const tIntentos = cookieSig.puntos - resta;

      if (tIntentos <= 0) {
        const res = {
          resultado: `Resultado de la resta es: ${resta}`,
          usuario: `Usuario: ${cookies.usuario}`,
          mensaje: `Se acabaron los puntos`};
        response.cookie('puntos', tIntentos, { signed: true });
        response.send(res);
      } else {
        const res = {
          resultado: `Resultado de la resta es: ${resta}`,
          usuario: `Usuario: ${cookies.usuario}`,
          mensaje: `Tiene ${tIntentos} puntos disponibles `};
        response.cookie('puntos', tIntentos, { signed: true });
        return response.send(res);
      }
    } else {
      return response.status(400).send({
        mensaje: 'ERROR... no existen numeros para RESTAR',
        error: 400,
      });
    }
    /*
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
    } */
  }

  @Put('/multiplicarDosNumeros')
  @HttpCode(202)
  multiplicacion(@Query() queryParams,
                 @Response() response,
                 @Request() request) {
    if (queryParams.numeroUno && queryParams.numeroDos) {
      const cookies = request.cookies;
      const cookieSig = request.signedCookies;
      if (!cookieSig.puntos) {
        response.cookie('puntos', 100, { signed: true });
      }
      const n1 = Number(queryParams.numeroUno);
      const n2 = Number(queryParams.numeroDos);
      if (!cookies.usuario) {
        response.cookie('usuario', 'KevCP');
      }
      const multiplicacion = n1 * n2;
      const tIntentos = cookieSig.puntos - multiplicacion;

      if (tIntentos <= 0) {
        const res = {
          resultado: `Resultado de la multiplicacion es: ${multiplicacion}`,
          usuario: `Usuario: ${cookies.usuario}`,
          mensaje: `Se acabaron los puntos`};
        response.cookie('puntos', tIntentos, { signed: true });
        response.send(res);
      } else {
        const res = {
          resultado: `Resultado de la multiplicacion es: ${multiplicacion}`,
          usuario: `Usuario: ${cookies.usuario}`,
          mensaje: `Tiene ${tIntentos} puntos disponibles `};
        response.cookie('puntos', tIntentos, { signed: true });
        return response.send(res);
      }
    } else {
      return response.status(400).send({
        mensaje: 'ERROR... no existen numeros para MULTIPLICAR',
        error: 400,
      });
    }     /*
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
    }*/
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
    if (queryParams.numeroUno && bodyParams.numeroDos && Number((bodyParams.numeroDos) !== 0 )) {
      const cookies = request.cookies;
      const cookieSig = request.signedCookies;
      if (!cookieSig.puntos) {
        response.cookie('puntos', 100, { signed: true });
      }
      const n1 = Number(queryParams.numeroUno);
      const n2 = Number(bodyParams.numeroDos);
      if (!cookies.usuario) {
        response.cookie('usuario', 'Go Dota');
      }
      const division = n1 / n2;
      const tIntentos = cookieSig.puntos - division;

      if (tIntentos <= 0) {
        const res = {
          resultado: `Resultado de la division es: ${division}`,
          usuario: `Usuario: ${cookies.usuario}`,
          mensaje: `Se acabaron los puntos`};
        response.cookie('puntos', tIntentos, { signed: true });
        response.send(res);
      } else {
        const res = {
          resultado: `Resultado de la division es: ${division}`,
          usuario: `Usuario: ${cookies.usuario}`,
          mensaje: `Tiene ${tIntentos} puntos disponibles `};
        response.cookie('puntos', tIntentos, { signed: true });
        return response.send(res);
      }
    } else {
      return response.status(400).send({
        mensaje: 'ERROR.. no existen numeros para DIVIDIR' +
          ' o se envio 0',
        error: 400,
      });
    }
  }
  /*
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
} */
}
