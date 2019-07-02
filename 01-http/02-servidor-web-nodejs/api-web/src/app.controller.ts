import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Request, Res,
    Response,
    Session
} from '@nestjs/common';
import { AppService } from './app.service'
import * as Joi from '@hapi/joi'
import {options} from "tsconfig-paths/lib/options";




@Controller('/api')
export class AppController {

    arregloUsuario = [];

    constructor(private readonly appService: AppService) {}

    @Get('session')
    session(
        @Query('nombre') nombre,
        @Session() session
    ){
        console.log(session);
        session.autenticado = true;
        session.nombreUsuario = nombre;
        return 'ok';
    }

    @Get('/login')
    loginVista(
        @Res() res
    ){

        res.render('login');
    }

    @Post('/login')
    login(
        @Body() usuario,
        @Session() session,
        @Res() res
    ){
        if(usuario.username === 'jorge' && usuario.password === '12345678'){
            //    QUE HACEMOS
            session.username = usuario.username;
            res.redirect('/api/protegida');
        }else{
            res.status(400);
            res.send({mensaje:'Error login',error:400})
        }
    }

    @Get('/protegida')
    protegida(
        @Session() session,
        @Res() res
    ){
        if(session.username){
            res.render('protegida',{
                nombre:session.username});
        }else{
            res.redirect('/api/login');
        }
    }
    @Get('logout')
    logout(
        @Res() res,
        @Session() session,
    ){
        session.username = undefined;
        session.destroy();
        res.redirect('/api/login');
    }


    @Get()
    getHello(){

    }

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

    // ---------------------------------------------------

    //?llave=valor&llave2=valor2
    // PARAMETROS DE CONSULTA -> QUERY PARAMS
    @Get('/consultar')
    consultar(@Query() queryParams) {
        console.log(queryParams);
        if(queryParams.nombre) {
            return `Hola ${queryParams.nombre}`
        } else {
            return 'Hola extraño'
        }
    }

    //PARAMETROS DE RUTA -> ROUTE PARAMS
    @Get('/ciudad/:idCiudad')
    ciudad(@Param() routeParams) {
        switch (routeParams.idCiudad.toLowerCase()) {
            case 'quito':
                return 'Que fueff';
            case 'guayaquil':
                return 'Que mash ñañosh';
            default:
                return 'Buenas tardes';
        }
    }

    //PARAMETROS DE CUERPO -> BODY PARAMS
    @Post('registroComida')
    registroComida(
        @Body() bodyParams,
        @Response() response
    ) {
        if(bodyParams.nombre && bodyParams.cantidad) {
            const cantidad = Number(bodyParams.cantidad);
            if(bodyParams.cantidad > 1) {
                response.set('Premio','Guatita');
            }
            return response.send({mensaje:'Registro'});
        } else {
            return response.status(400).send({
                mensaje:'ERROR, no envia nombre o cantidad',
                error:400});
        }
    }

    @Get('/semilla')
    semilla(
        @Request() request,
        @Response() response
    ) {
        console.log(request.cookies);
        const cookies = request.cookies;  //JSON

        //---------------------------

        const esquemaValidacionNumero = Joi.object().keys(
            {
                numero:Joi.number().integer().required()
            });
        const objetoValidacion = {
            numero: cookies.numero
        };
        const resultado = Joi.validate(objetoValidacion,
            esquemaValidacionNumero);
        if(resultado.error) {
            console.log('Resultado', resultado);
        } else {
            console.log('Numero valido');
        }

        /*- ------------------------------------ */

        const cookieSegura = request.signedCookies.fechaServidor;
        if(cookieSegura) {
            console.log('Cookie segura');
        } else {
            console.log('No es valida esta cookie');
        }


        if(cookies.micookie) {

            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            horaFechaServidor.setMinutes(minutos + 1);

            response.cookie(
                'fechaServidor',          // nombre -> key
                new Date().getTime(),     // valor -> value
                {    // OPCIONES
                    // expires: horaFechaServidor
                    signed: true
                }

            );
            return response.send('ok');
        } else {
            return response.send(':(');
        }
    }

    // ---------------------------------------------------

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


    // Vistas

    @Get('/inicio')
    inicio(
        @Response() res
    ) {
        return res.render(
            'inicio',
            {
                estaVivo: true
        });
    }

    @Get('/peliculas')
    peliculas(
        @Response() res
    ) {
        return res.render(
            'peliculas/inicio.ejs',
            {

            });
    }

    @Get('/estilos')
    estilos(
        @Response() res
    ) {
        return res.render(
            'peliculas/estilos.ejs');
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
  publico metodoPublico(@parametroA() a) {}
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



function holaMundo() {
    console.log('Hola Mundo');
}
const respuestaHolaMundo = holaMundo();     // retorna undefined
console.log('Resp hola mundo: ',respuestaHolaMundo)

function suma(a:number, b:number):number {
    return a + b;
}
const respuestaSuma = suma(1,2);
console.log('Resp suma:', respuestaSuma);


// Condicionales
if(true) {          // Truty
    console.log('Verdadeero');
} else {
    console.log('Falso');
}

if(false) {         // Falsy
    console.log('Verdadeero');
} else {
    console.log('Falso');
}

if("") {            // Un string vacio en JS es Falsy
    console.log('Verdadero "" ');
} else {
    console.log('Falso "" ');
}

if("b") {            // Un string con un caracter o mas en JS es Truty
    console.log('Verdadero "" ');
} else {
    console.log('Falso "" ');
}

if(0) {            // El 0 en JS es Falsy
    console.log('Verdadero "" ');
} else {
    console.log('Falso "" ');
}

if("0") {            // El 0 string en JS es Truty
    console.log('Verdadero "0" ');
} else {
    console.log('Falso "0" ');
}

if(-1) {            // El -1 en JS es Truty
    console.log('Verdadero "-1" ');
} else {
    console.log('Falso "-1" ');
}

if(1) {            // El 1 en JS es Truty
    console.log('Verdadero "1" ');
} else {
    console.log('Falso "1" ');
}

if(undefined) {            // El undifined en JS es Falsy
    console.log('Verdadero "U" ');
} else {
    console.log('Falso "U" ');
}

if(null) {            // El null en JS es Falsy
    console.log('Verdadero "N" ');
} else {
    console.log('Falso "N" ');
}

if({}) {            // El JSON vacio en JS es Truty
    console.log('Verdadero "JSON" ');
} else {
    console.log('Falso "JSON" ');
}


// Operadores de Arreglos en JS
const arreglo = [
    function () { return '0'},
    1,
    'B',
    true,
    {},
    []
];

const arregloNumeros = [1,2,3,4,5,6];

// 1) Imprima en consola todos los elementos
const arregloNumerosForEach = [1,2,3,4,5,6];
const respuestaForEach = arregloNumerosForEach
    .forEach(
        function (valorActual,
                  indice,
                  arreglo) {
            //console.log(`Valor: ${valorActual}`);
            //console.log(`Indice: ${indice}`);
            console.log(`Arreglo: ${arreglo}`);
        }
    );

const respuestaForEach2 = arregloNumerosForEach
    .forEach((arreglo) => console.log(`Arreglo: ${arreglo}`));

console.log(`Respuesta ForEach: ${respuestaForEach2}`);

// 2) Sume 2 a los pares y 1 a los impares
const arregloNumerosMap = [1,2,3,4,5,6];
const respuestaMap = arregloNumerosMap
    .map(               // Devolver el nuevo valor de ese elemento
        (valorActual) => {
            const esPar  = valorActual%2 == 0;
            if(esPar) {
                return valorActual + 2;
            } else {
                return valorActual + 1;
            }
        }
    );
console.log(`Respuesta Map: ${respuestaMap}`);

// 3) Encontrar si existe el numero 4
const arregloNumerosFind = [1,2,3,4,5,6];
const respuestaFind = arregloNumerosFind
    .find(
        (valorActual) => {
            return valorActual == 4;
        }
    );
console.log(`Respuesta Find: ${respuestaFind}`);

// 4) Filtrar los numeros menos a 5
const arregloNumerosFilter = [1,2,3,4,5,6];
const respuestaFilter = arregloNumerosFilter
    .filter(
        (valorActual) => {
            return valorActual < 5;
        }
    );
console.log(`Respuesta Filter: ${respuestaFilter}`);

// 5) Todos los valores son positivos
const arregloNumerosEvery = [1,2,3,4,5,6];
const respuestaEvery = arregloNumerosEvery
    .every(
        (valorActual) => {
            return valorActual > 0
        }
    );
console.log(`Respuesta Every: ${respuestaEvery}`);

// 6) Algun valor es menor que 2 ?
const arregloNumerosSome = [1,2,3,4,5,6];
const respuestaSome = arregloNumerosSome
    .some(
        (valorActual) => {
            return valorActual < 2
        }
    );
console.log(`Respuesta Some: ${respuestaSome}`);

// 7) Sumar todos los valores
// numero < 4 -> 10% + 5
// numero >= 4 -> 15% + 3
const arregloNumerosReduce = [1,2,3,4,5,6];
const valorDondeEmpiezaCalculo = 0;
const respuestaReduce = arregloNumerosReduce
    .reduce(
        (acumulado, valorActual) => {
            if (valorActual < 4) {
                return  acumulado + valorActual*1.1 + 5;
            } else {
                return acumulado + valorActual*1.15 + 3;
            }
        },
        valorDondeEmpiezaCalculo
    );
console.log(`Respuesta Reduce: ${respuestaReduce}`);

// 8) Restar todos los valores de 100
const arregloNumerosCien = [1,2,3,4,5,6];
const valorDondeEmpiezaCien = 100;
const respuestaCien = arregloNumerosCien
    .reduce(
        (acumulado, valorActual) => {
            return acumulado - valorActual;
        },
        valorDondeEmpiezaCien
    );
console.log(`Respuesta Reduce2: ${respuestaCien}`);

const arregloEjercicio = [1,2,3,4,5,6];
// 1.1) Sumar 10 a todos
// 1.2) Filtrar a los mayores a 15
// 1.3) Si exite algun numero mayor a 30
const respuestaEjercicio = arregloEjercicio
    .map(
        (valorActual) => {
            return valorActual + 10;
        }
    ).filter(
    (valorActual) => {
        return valorActual > 15;
    }
).some(
    (valorActual) => {
        return valorActual > 30;
    });
console.log(`Respuesta Ejercicio: ${respuestaEjercicio}`);