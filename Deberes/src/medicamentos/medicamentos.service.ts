import { Injectable } from '@nestjs/common';
import {Medicamentos} from "./bdd/medicamentos";


@Injectable()
export class MedicamentosService {
    bddMedicamentos: Medicamentos[]=[];
    recnum=1;
    constructor (){
    }
    
    crearMedicamento(nuevoMedicamento: Medicamentos):Medicamentos {
        nuevoMedicamento.id= this.recnum;
        this.recnum++;
        this.bddMedicamentos.push(nuevoMedicamento);
        return nuevoMedicamento;
    }
    
    
    eliminarPorId(id:number):Medicamentos[]{
        console.log('id:', id);
        const indice= this.bddMedicamentos.findIndex(
            (medicamentoss)=>{
                return medicamentoss.id===id
            }
        );
        this.bddMedicamentos.splice(indice,1);
        return this.bddMedicamentos;
    }
    buscarPorNombre(nombre: string, id:number) {
        console.log('nombre:', nombre);
        const resultado=this.bddMedicamentos.filter(
            (medicamento)=>{
                return medicamento.nombreMedicamento.includes(nombre) && medicamento.pacienteId===id ;
            }
        );
        console.log('resultado:',resultado);
        return resultado;


    }
    buscarPorId(id: number) {
        console.log('id:', id);
        const resultado=this.bddMedicamentos.filter(
            (medicamento)=>{
                return medicamento.pacienteId===id;
            }
        );
        console.log('resultado:',resultado);
        return resultado;


    }

}