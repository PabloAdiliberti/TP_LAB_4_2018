import { Component, OnInit } from '@angular/core';
import { ViajesService } from  '../../servicios/viajes.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Viaje} from '../../clases/viaje';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  viajes:any;
  misviajes : Array<Viaje>

  origen:string;
  destino:string;
  pago:string;
  vehiculo:string;
  miViaje:Viaje;
  idCliente:string;
  nivel:string;

  constructor(private ViajesServ:ViajesService) {
    this.miViaje = new Viaje();
    this.pago = "";
    this.vehiculo = "";
    this.nivel = "";
    this.idCliente = localStorage.getItem("idCliente");
    this.misviajes = new Array<Viaje>();
    this.TraerDatos();
  }

  ngOnInit() {
  }


  TraerDatos()
  {
    this.misviajes = null;
    this.misviajes = new Array<Viaje>();
    this.ViajesServ.TraerViajes()
    .then(
      lista=>{this.viajes=lista;     
        for (let index = 0; index < this.viajes.length; index++) {
          if(this.viajes[index].idcliente == this.idCliente )
           {
            this.misviajes.push(this.viajes[index]);
           }
         }
    })
    .catch(e=>{alert("Fallo")});
  }

  Solicitar()
  {
    if(this.ValidarDatos())
    {
        this.SolicitarInternal();
    }
    else
    {
        alert("Complete todos los campos.");
    }
  }

  SolicitarInternal()
  {
      this.miViaje.destino = this.destino;
      this.miViaje.origen = this.origen;
      this.miViaje.mediopago = this.pago;
      this.miViaje.prestacion = this.vehiculo;
      this.miViaje.nivel = this.nivel;
      this.miViaje.estado = "Solicitado";
      this.miViaje.idremisero = null;
      this.miViaje.idcliente = +localStorage.getItem("idCliente");

      var dt = new Date();
      var month = dt.getMonth()+1;
      var day = dt.getDate();
      var year = dt.getFullYear();
      this.miViaje.fecha = day + '-' + month + '-' + year;

      var hora = dt.getHours();
      var min = dt.getMinutes();
      var seg = dt.getSeconds();
      this.miViaje.hora = hora + ':' + min + ':' + seg;

      if(this.miViaje.id == null)
      {
        var respuesta=  this.ViajesServ.IngresarViaje(this.miViaje,mensaje => {
          console.log(mensaje); 
          alert(mensaje);
          this.Limpiar();
          this.TraerDatos();
        });
      }
      else
      {
        var respuesta=  this.ViajesServ.ModificarConID(this.miViaje,mensaje => {
          console.log(mensaje); 
          alert(mensaje);
          this.Limpiar();
          this.TraerDatos();
        });
      }
  }

  Limpiar()
  {
    this.miViaje.id = null;
    this.destino = "";
    this.origen = "";
    this.pago = "";
    this.vehiculo = "";
    this.nivel ="";
    this.miViaje.id = null;
    this.miViaje.destino = "";
    this.miViaje.origen = "";
    this.miViaje.mediopago = "";
    this.miViaje.prestacion = "";
    this.miViaje.estado = "";
    this.miViaje.idremisero = null;
    this.miViaje.idcliente = null;
    this.miViaje.fecha = "";
    this.miViaje.hora = "";
  }

  Borrar(id:number)
  {
        var respuesta = this.ViajesServ.BorrarViaje(id.toString(), retorno => {
      alert(retorno);
      this.TraerDatos();
    });
   
  }

  Modificar(id:number)
  {
    this.miViaje.id = null;
    this.ViajesServ.TraerUnViaje(id.toString())
    .then(
      viaje=>{  this.miViaje = viaje

        this.miViaje.id = viaje.id;
        this.destino = viaje.destino;
        this.origen = viaje.origen;
        this.pago = viaje.mediopago;
        this.vehiculo = viaje.prestacion;
        this.nivel = viaje.nivel
    })
    .catch(e=>{alert("Fallo")});
  }

  ValidarDatos()
  {
    var retorno = true;
    retorno = retorno && this.destino != "" && this.destino != null;
    retorno = retorno && this.origen != "" && this.origen != null;
    retorno = retorno && this.vehiculo != "" && this.vehiculo != null;
    retorno = retorno && this.nivel != "" && this.nivel != null;


    return retorno;
  }


}
