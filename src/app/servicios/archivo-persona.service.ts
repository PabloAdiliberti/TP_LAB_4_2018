import { Injectable } from '@angular/core';
import {MiHttpService} from './mi-http.service';


@Injectable({
  providedIn: 'root'
})
export class ArchivoPersonaService {

  constructor(public mihttp:MiHttpService) { }

  public APIPostJWT(Ruta:string,usuario:string,clave:string, callback: (token: string) => void) { 
   var rta =  this.mihttp.postjwt(Ruta ,usuario,clave, data => { 
    console.log(data);

    var tipo = JSON.parse(data.text()).tipo.tipo;
    var id = JSON.parse(data.text()).tipo.id;
    localStorage.clear();
    localStorage.setItem("tipo",tipo);
    localStorage.setItem("idCliente",id);
    var token = JSON.parse(data.text()).token;
      
      callback(token);
    }); 
  }
 
  //insertar usuario pablo
  Insertar(url:string,object:any, callback: (r: string) => void)
  {
     this.mihttp.Insertar(url ,object, data => { 
      var mensaje = JSON.parse(data.text()).mensaje;
      console.log(mensaje);
      callback(mensaje);
      }); 

  }


    //traer todos 
    public TraerUsuarios(url:string) 
    {
      return this.mihttp.dameunapromesa(url)
      .then(datos =>datos)
      .catch(e=>e);
    }
  
}
