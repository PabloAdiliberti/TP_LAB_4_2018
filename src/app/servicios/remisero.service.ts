import { Injectable } from '@angular/core';
import {MiHttpService} from './mi-http.service';
import {Remisero} from '../clases/remisero'

@Injectable({
  providedIn: 'root'
})
export class RemiseroService {

  constructor(public mihttp:MiHttpService) { }


   //traer todos 
   public TraerRemiseros() 
   {
     return this.mihttp.dameunapromesa( "remisero/" )
     .then(datos =>datos)
     .catch(e=>e);
   }

    //modificar
    public ModificarRemisero(object:any, callback: (r: string) => void)
    { 
      this.mihttp.Modificar("remisero/modificar",object, data => { 
        console.log(data);
        var mensaje = JSON.parse(data.text()).mensaje;  
        callback(mensaje);
      }); 
    }

    // traer uno
    public TraerUnRemiseroPorUsuario(id:string)
    {
        return this.mihttp.dameunapromesa( "remisero/"+id )
        .then(datos =>datos)
        .catch(e=>e);
    }

    //modificar idvehiculo
    public ModificarIdVehiculo(object:any, callback: (r: string) => void)
    { 
      this.mihttp.Modificar("remisero/modificaridvehiculo",object, data => { 
        console.log(data);
        var mensaje = JSON.parse(data.text()).mensaje;  
        callback(mensaje);
      }); 
    }

}
