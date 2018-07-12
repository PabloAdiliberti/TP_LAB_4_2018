import { Usuario } from './usuario';

export class Remisero extends Usuario {
    //public $id;
    public habilitado:string
    public idvehiculo:string;
    public vehiculo:string;
    public idusuario:string;
    public enviaje:string;

    public tipoVehiculo:string;
    public montoTotal:number;

}