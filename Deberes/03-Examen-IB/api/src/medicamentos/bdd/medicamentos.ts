export interface Medicamentos{
    id?:number;
    gramosAIngerir:number;
    nombreMedicamento:string;
    composicion:string;
    proposito:string;
    fechaCaducidad:Date;
    numeroPastillas:number;
    pacienteId:number
}