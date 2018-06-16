import { Injectable } from '@angular/core';
import {MiHttpService} from './mi-http.service';
import {Viaje} from '../clases/viaje'

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  constructor(public mihttp:MiHttpService) { }

    //traer todos 
    public TraerViajes() 
    {
      return this.mihttp.dameunapromesa( "viaje/" )
      .then(datos =>datos)
      .catch(e=>e);
    }

     //ingresar
    public IngresarViaje(miViaje:Viaje, callback: (mensaje: string) => void) 
    { 
    var rta =  this.mihttp.Insertar( "viaje/" ,miViaje, data => {
      console.log(data); 
      var mensaje = JSON.parse(data.text()).mensaje;
      callback(mensaje);
      }); 
  
    }

    public BorrarViaje(id: string, callback: (r: string) => void)
    {
      this.mihttp.Delete("viaje/delete",id, data => { 

        var mensaje = JSON.parse(data.text()).mensaje;
        console.log(mensaje); 
        callback(mensaje);
      });  
    }

        // traer uno
    public TraerUnViaje(id:string)
    {
        return this.mihttp.dameunapromesa( "viaje/"+id )
        .then(datos =>datos)
        .catch(e=>e);
    }


    //modificar
    public ModificarConID(object:any, callback: (r: string) => void)
    {
      //console.log(object); 
      this.mihttp.Modificar("viaje/modificar",object, data => { 
        console.log(data);
        var mensaje = JSON.parse(data.text()).mensaje;
        //console.log(mensaje); // mensaje   
        callback(mensaje);
      }); 
    }

    //modificar
    public ModificarViajeParaRemisero(object:any, callback: (r: string) => void)
    {
      //console.log(object); 
      this.mihttp.Modificar("viaje/modificarpararemisero",object, data => { 
        console.log(data);
        var mensaje = JSON.parse(data.text()).mensaje;
        //console.log(mensaje); // mensaje   
        callback(mensaje);
      }); 
    }

    //modificar
    public ModificarViajePorMedioPago(object:any, callback: (r: string) => void)
    {
      //console.log(object); 
      this.mihttp.Modificar("viaje/modificarMedioPago",object, data => { 
        console.log(data);
        var mensaje = JSON.parse(data.text()).mensaje;
        //console.log(mensaje); // mensaje   
        callback(mensaje);
      }); 
    }

}
