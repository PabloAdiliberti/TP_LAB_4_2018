import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {


  asignarViajes:boolean;
  pedido:boolean;
  habilitaciones:boolean;
  todos:boolean;
  remiseroviajes:boolean;

  tipo:string;

  constructor() { 
    this.pedido = true;

    this.tipo = localStorage.getItem("tipo");
    this.MostarRutas();

  }

  ngOnInit() {
  }

  MostarRutas()
  {
    switch(this.tipo){
      case "admin":{
        this.asignarViajes = false;
        this.pedido = true;
        this.habilitaciones = false;
        this.todos = false;
        this.remiseroviajes = true;
        break;}
      case "cliente":{
        this.asignarViajes = true;
        this.pedido = false;
        this.habilitaciones = true;
        this.todos = true;
        this.remiseroviajes = true;
        break;}
      case "remisero":{
        this.asignarViajes = true;
        this.pedido = true;
        this.habilitaciones = true;
        this.todos = true;
        this.remiseroviajes = false;
        break;}                      
    }
  }

}
