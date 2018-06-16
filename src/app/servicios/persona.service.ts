import { Injectable } from '@angular/core';
import { MiHttpService } from  './mi-http.service';
import { ArchivoPersonaService } from './archivo-persona.service';
import {Usuario} from './../clases/usuario';

@Injectable()
export class PersonaService {

  constructor(private archivoPersonaS:ArchivoPersonaService) { }

  GenerarToken(usuario:string,clave:string, callback: (token: string) => void){
    this.archivoPersonaS.APIPostJWT("ingreso/",usuario,clave, token => { 
    callback(token);
    });
  }

    //ingresar pablo
    public APIIngresar(miUsuario:Usuario, callback: (token: string) => void) 
    { 
     var rta =  this.archivoPersonaS.Insertar( "usuario/" ,miUsuario, data => {
        console.log(data); 
        callback(data); 
      }); 
    }


    //traer todos 
    public TraerTodosLosUsuarios() 
    {
      return this.archivoPersonaS.TraerUsuarios( "usuario/" )
      .then(datos =>datos)
      .catch(e=>e);
    }

    //ingresar remisero
    public IngresarRemisero(miUsuario:Usuario, callback: (token: string) => void) 
    { 
      var rta =  this.archivoPersonaS.Insertar( "usuario/modificarpararemisero" ,miUsuario, data => {
        console.log(data); 
        callback(data); 
      }); 
    }

}
