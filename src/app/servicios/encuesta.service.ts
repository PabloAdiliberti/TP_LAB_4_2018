import { Injectable } from '@angular/core';
import {MiHttpService} from './mi-http.service';
import {Encuesta} from '../clases/encuesta'

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(public mihttp:MiHttpService) { }


  //ingresar
  public IngresarmiEncuesta(miEncuesta:Encuesta, callback: (mensaje: string) => void) 
  { 
  var rta =  this.mihttp.Insertar( "encuesta/" ,miEncuesta, data => {
    console.log(data); 
    var mensaje = JSON.parse(data.text()).mensaje;
    callback(mensaje);
    }); 
  }

  
  //traer todos 
  public TraerEncuestas() 
  {
    return this.mihttp.dameunapromesa( "encuesta/" )
    .then(datos =>datos)
    .catch(e=>e);
  }
}
