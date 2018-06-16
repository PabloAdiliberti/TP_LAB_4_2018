import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

var path = "http://localhost:8080/proyectoNuevo/Api/index.php/";

@Injectable()
export class MiHttpService {

  constructor(private http:Http) { }

  postjwt(url:string,username:string,password:string, callback: (r: Response) => void)
  {
   // console.log(path+url);
    let data = new URLSearchParams();
    data.append('mail',username);
    data.append('clave', password);
       this.http
      .post(path+url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          alert("Usuario y/o Clave no son validos");
        });
  }

  //insertar usuario
  Insertar(url:string,object:any, callback: (r: Response) => void)
  {

    let data = new URLSearchParams();

    data=object;
        this.http
      .post(path+url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          alert("Error al guardar");
        });
  }

    //Borrar
    Delete(url:string,id:string, callback: (r: Response) => void)
    {
      //console.log(path+url);
      
      let data = new URLSearchParams();
      data.append('id',id);
      return this.http
      .post(path+url, data)
      .map(res => res)  
      .subscribe(callback,
        error => {
          alert("No Borro");
        });
  
    }

  //traer uno
  Traeruno(url:string)
  {
    return this.http
    .get(path+url)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.manejadorDeError);
  }

  //traer todos
  dameunapromesa(url:string)
  {
    return this.http
    .get(path+url)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.manejadorDeError);
  }

  //modificar
  Modificar(url:string,object:any, callback: (r: Response) => void)
  {
    let data = new URLSearchParams();
    data=object;
        this.http
      .post(path+url,data)
      .map(res => res)  
      .subscribe(callback,
        error => {
          alert("No modifico");
          console.log(error);
        });
  }

  manejadorDeError(error:Response|any)
  { 
    console.log(error);
        return error;
  }

  extraerDatos(respuesta:Response)
  {
        //console.log(respuesta);
        return respuesta.json()||{};
  }

}
