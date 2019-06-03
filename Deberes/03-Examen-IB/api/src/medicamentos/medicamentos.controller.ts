import {Controller, Get, Response, Request, Headers, Post, Body, Res, Param} from '@nestjs/common';
import {MedicamentosService} from "./medicamentos.service";
import {Medicamentos} from "./bdd/medicamentos";

@Controller('examen/paciente')
export class MedicamentosController {
    constructor(private readonly medicamentosService: MedicamentosService) {

    }
    @Get('/gestionarMedicamentos/:id')
    gestionarMedicamentos(@Param() params,
                          @Headers() headers,
                          @Request() request, @Response() response) {
        id= Number(params.id);
        const cookieSeg = request.signedCookies;
        const arregloMedicamentos = this.medicamentosService.buscarPorId(Number(id));
        console.log('arrprod:',arregloMedicamentos);
        if (cookieSeg.nombreUsuario) {

            return response.render('Medicamentos/gestionarmedicamentos',{id:id,arregloMedicamentos:arregloMedicamentos,nombre:cookieSeg.nombreUsuario})

        }
        else{
            return response.redirect('/examen/inicioSesion');
        }

    }

    @Get('/busquedaMedicamento/:id')
    busquedaMedicamentos(@Param() params, @Headers() headers, @Request() request, @Response() response) {
        id= Number(params.id);
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {

            return response.render('Medicamentos/gestionarmedicamentos',{id:id,arregloMedicamentos:arregloMedicamentoBusqueda,nombre:cookieSeg.nombreUsuario})

        }
        else{
            return response.redirect('/examen/inicioSesion');
        }


    }


    @Get('/crearMedicamento/:id')
    crearMedicamento( @Param() params,@Res() res,@Request() request){
        const cookieSeg = request.signedCookies;
        console.log(id);

        if (cookieSeg.nombreUsuario) {

            return res.render('Medicamentos/crearmedicamento',{
                nombre:cookieSeg.nombreUsuario,
                id:id
            })

        }
        else{
            return res.redirect('/examen/inicioSesion');
        }


    }
    @Post('/crearMedicamento')
    crearMedicamentoPost(
        @Body() medicamento:Medicamentos,
        @Res() res,
        @Param() params,
        @Request() request
    ){
        const cookieSeg = request.signedCookies;
        medicamento.gramosAIngerir=Number(medicamento.gramosAIngerir);
        medicamento.fechaCaducidad = new Date(medicamento.fechaCaducidad);
        medicamento.numeroPastillas=Number(medicamento.numeroPastillas);
        medicamento.pacienteId=Number(medicamento.pacienteId);
        console.log(medicamento);
        this.medicamentosService.crearMedicamento(medicamento);
        if (cookieSeg.nombreUsuario) {

            res.redirect('/examen/paciente/gestionarMedicamentos/'+id);

        }
        else{
            return res.redirect('/examen/inicioSesion');
        }


    }
    @Post('eliminarMedicamentos')
    eliminarMedicamentos(@Param() params,
                         @Res() res,
                         @Body('pacienteIdMedicamento') idPaciente: number,
                     @Body('idMedicamento') idMedicamento: number, @Request() request) {

        const cookieSeg = request.signedCookies;
        this.medicamentosService.eliminarPorId(Number(idMedicamento));
        if (cookieSeg.nombreUsuario) {

            res.redirect('/examen/paciente/gestionarMedicamentos/'+idPaciente);

        }
        else{
            return res.redirect('/examen/inicioSesion');
        }


    }
    @Get('/buscarMed/:id')
    buscarMedicamento( @Param() params,
                       @Res() res,@Request() request){
        const cookieSeg = request.signedCookies;
        console.log(id);
        if (cookieSeg.nombreUsuario) {

            return res.redirect('/examen/paciente/buscarMedicamento'+id)

        }
        else{
            return res.redirect('/examen/inicioSesion');
        }

    }



    @Post('buscarMedicamento')
    buscarMedicamentoPost(@Param() params,@Res() res,
                   @Body('busquedaMedicamentos') busquedaMedicamentos: string, @Request() request) {
        const cookieSeg = request.signedCookies;
        arregloMedicamentoBusqueda=this.medicamentosService.buscarPorNombre(busquedaMedicamentos,id);
        console.log('impiendo arreglo medicamentos:',arregloMedicamentoBusqueda);

        if(busquedaMedicamentos!=null){
            if (cookieSeg.nombreUsuario) {

                res.redirect('/examen/paciente/busquedaMedicamento/'+id);

            }
            else{
                return res.redirect('/examen/inicioSesion');
            }

        }else{
            if (cookieSeg.nombreUsuario) {

                res.redirect('/examen/paciente/gestionarMedicamentos/'+id);

            }
            else{
                return res.redirect('/examen/inicioSesion');
            }

        }
    }


}
let id:number;
let arregloMedicamentoBusqueda:Medicamentos[];