import {Injectable} from "@nestjs/common";
import {Pacientes} from "./bdd/pacientes";



@Injectable()
export class PacienteService {
    bddPacientes: Pacientes[]=[];
    recnum=1;
    
    constructor (){
    }
    
    crearPaciente(nuevoPaciente: Pacientes):Pacientes {
        nuevoPaciente.id= this.recnum;
        this.recnum++;
        this.bddPacientes.push(nuevoPaciente);
        return nuevoPaciente;
    }
    
    eliminarPorId(id:number):Pacientes[]{
        console.log('id:', id);
        const indice= this.bddPacientes.findIndex(
            (paciente)=>{
                return paciente.id===id
            }
        );
        this.bddPacientes.splice(indice,1);
        return this.bddPacientes;
    }
    buscarPorNombre(nombre: string) {
        console.log('nombre:', nombre);
        const resultado=this.bddPacientes.filter(
            (paciente)=>{
                return paciente.nombres.includes(nombre);
            }
        );
        console.log('resultado:',resultado);
        return resultado;
    }

}