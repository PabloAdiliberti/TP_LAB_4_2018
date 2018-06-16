import { Injectable } from '@angular/core';
import {MiHttpService} from './mi-http.service';
import {Vehiculo} from '../clases/vehiculo'

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(public mihttp:MiHttpService) { }

     //traer todos 
     public TraerVehiculos() 
     {
       return this.mihttp.dameunapromesa( "vehiculo/" )
       .then(datos =>datos)
       .catch(e=>e);
     }

         //modificar
    public ModificarVehiculo(object:any, callback: (r: string) => void)
    { 
      this.mihttp.Modificar("vehiculo/modificar",object, data => { 
        console.log(data);
        var mensaje = JSON.parse(data.text()).mensaje;  
        callback(mensaje);
      }); 
    }


    //ingresar
    public IngresarmiVehiculo(miVehiculo:Vehiculo, callback: (mensaje: string) => void) 
    { 
    var rta =  this.mihttp.Insertar( "vehiculo/" ,miVehiculo, data => {
      console.log(data); 
      var mensaje = JSON.parse(data.text()).mensaje;
      callback(mensaje);
      }); 

    }
}
