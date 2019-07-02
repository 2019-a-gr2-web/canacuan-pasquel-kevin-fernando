export interface Tragos {
    id?: number;
    nombre: string;
    tipo: 'Ron' | 'Vodka' | 'Tequila' | 'Whiskey' | 'Puntas' | 'Cervezas';
    gradosAlcohol: number;
    fechaCaducidad: Date;
    precio: number;
}
