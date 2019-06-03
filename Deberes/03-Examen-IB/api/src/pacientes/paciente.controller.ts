import {Controller, Get, Response, Request, Headers, Post, Body, Res} from '@nestjs/common';
import {Pacientes} from "./bdd/pacientes";
import {PacienteService} from "./paciente.service";
import {Medicamentos} from "../medicamentos/bdd/medicamentos";


@Controller('/examen')
export class PacienteController {
    constructor(private readonly pacienteService: PacienteService) {
    }
    @Post('/login')
    loginCookie1(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
        const cookieSeg = request.signedCookies;
        if (!cookieSeg.nombreUsuario) {

            response.cookie('nombreUsuario', nombre,{signed: true});
            cookieSeg.nombreUsuario=nombre;

        }
        if (cookieSeg.nombreUsuario) {

            response.redirect('/examen/bienvenido')
        }
        else{
            return response.redirect('/examen/inicioSesion');
        }

    }



    @Get('/gestionPacientes')
    gestionarPacientes1(@Headers() headers, @Request() request, @Response() response) {
        const cookieSeg = request.signedCookies;

        if (cookieSeg.nombreUsuario) {

            return response.render('Pacientes/gestionpacientes',{arregloPacientes:arregloPacienteBusqueda,nombre:cookieSeg.nombreUsuario})
        }
        else{
            return response.redirect('/examen/inicioSesion');
        }




    }@Post('/borrarCookie')
    borrarCookiemethod(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
        response.clearCookie("nombreUsuario");
        response.redirect('/examen/inicioSesion')
    }

    @Get('/inicioSesion')
    inicioSesion(@Response() res){
        return res.render('login')
    }

    @Get('/gestion')
    gestion(@Response() res, @Request() request){
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {

            res.redirect('/examen/gestionarPacientes')
        }
        else{
            return res.redirect('/examen/inicioSesion');
        }
    }


    @Get('/crearPaciente')
    crearPaciente( @Res() res,@Request() request){
        const cookieSeg = request.signedCookies;

        if (cookieSeg.nombreUsuario) {

            return res.render('Pacientes/crearPaciente',{
                nombre:cookieSeg.nombreUsuario
            })
        }
        else{
            return res.redirect('/examen/inicioSesion');
        }


    }
    @Post('/crearPaciente')
    crearPacientePost(
        @Body() paciente:Pacientes,
        @Res() res,
        @Request() request
    ){
        const cookieSeg = request.signedCookies;
        paciente.numeroHijos=Number(paciente.numeroHijos);
        paciente.fechaNacimiento =new Date(paciente.fechaNacimiento);
        paciente.tieneSeguro= Boolean(paciente.tieneSeguro);
        console.log(paciente);
        this.pacienteService.crearPaciente(paciente);
        if (cookieSeg.nombreUsuario) {

            res.redirect('/examen/gestionarPacientes');
        }
        else{
            return res.redirect('/examen/inicioSesion');
        }

    }


    @Post('eliminar')
    eliminarPaciente(@Res() res,
                   @Body('id') id: number, @Request() request) {
        const cookieSeg = request.signedCookies;
        this.pacienteService.eliminarPorId(Number(id));
        if (cookieSeg.nombreUsuario) {

            res.redirect('/examen/gestionarPacientes');
        }
        else{
            return res.redirect('/examen/inicioSesion');
        }

    }


    @Post('/buscarPacientes')
    buscarPaciente(@Res() res,
                 @Body('busquedaPacientes') busquedaPacientes: string, @Request() request) {
        const cookieSeg = request.signedCookies;
        arregloPacienteBusqueda=this.pacienteService.buscarPorNombre(busquedaPacientes);
        console.log('imprimiendo arreglo pacientes:',arregloPacienteBusqueda);
        if(busquedaPacientes!=null){
            if (cookieSeg.nombreUsuario) {
                res.redirect('/examen/gestionPacientes');
            }
            else{
                return res.redirect('/examen/inicioSesion');
            }

        }else {
            if (cookieSeg.nombreUsuario) {

                res.redirect('/examen/gestionPacientes');
            }
            else{
                return res.redirect('/examen/inicioSesion');
            }

        }
    }

    //-----------------------------------

    @Get('/bienvenido')
    bienvenido(@Response() res,  @Request() request){
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            return res.render('paginaprincipal',{
                nombre:cookieSeg.nombreUsuario
            })
        }
        else{
            return res.redirect('/examen/inicioSesion');
        }
    }

    @Get('/gestionarPacientes')
    gestionarPacientes(@Request() request, @Response() response) {
        const cookieSeg = request.signedCookies;
        const arregloPacientes = this.pacienteService.bddPacientes;
        if (cookieSeg.nombreUsuario) {
            return response.render('Pacientes/gestionpacientes',{arregloPacientes:arregloPacientes,nombre:cookieSeg.nombreUsuario})
        } else {
            return response.redirect('/examen/inicioSesion');
        }


    }

}
let arregloPacienteBusqueda:Pacientes[];