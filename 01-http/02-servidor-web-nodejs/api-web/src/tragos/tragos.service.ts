import {Injectable} from "@nestjs/common";
import {Trago} from "./interfaces/trago";

@Injectable()
export class TragosService {

    bddTragos:Trago[] = [];
    recnum = 1;

    constructor() {
        const traguito:Trago = {
            nombre:'Pilseer',
            gradosAlcohol:4.3,
            fechaCaducidad: new Date(2019,5,10),
            precio:1.75,
            tipo:"Cerveza"
        };
        this.crear(traguito);
    }

    crear(nuevoTrago:Trago):Trago {
        nuevoTrago.id = this.recnum;
        this.recnum++;
        this.bddTragos.push(nuevoTrago);
        return nuevoTrago;
    }

    // @ts-ignore
    buscarPorId(id:number):Trago {
        this.bddTragos.find(
            (trago) => {
                return trago.id === id;
            }
        );
    }

    // @ts-ignore
    buscarPorNombre(nombre:string):Trago {
        this.bddTragos.find(
            (trago) => {
                return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
            }
        );
    }

    eliminarPorId(id:number):Trago[] {
        const indice = this.bddTragos.findIndex(
            (trago) => {
                return trago.id ===id;
            }
        );
        this.bddTragos.splice(indice, 1);
        return this.bddTragos;
    }

    actualizar(tragoActualizado: Trago,
                    id: number):Trago[] {
        const indice = this.bddTragos.findIndex(
            (trago) => {
                return trago.id ===id;
            }
        );
        tragoActualizado.id = this.bddTragos[indice].id;
        this.bddTragos[indice] = tragoActualizado;
        return this.bddTragos;
    }


}