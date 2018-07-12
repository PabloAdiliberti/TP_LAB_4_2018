import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ViajesService } from  '../../servicios/viajes.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Viaje} from '../../clases/viaje';
import { AlertsService } from 'angular-alert-module';
import { NgxSpinnerService } from 'ngx-spinner';



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
  flag : boolean;

  constructor(private ViajesServ:ViajesService,
    private alerts: AlertsService,
    private spinner: NgxSpinnerService,
              private router: Router) {
              
    this.miViaje = new Viaje();
    this.flag = false;
    this.pago = "";
    this.vehiculo = "";
    this.nivel = "";
    this.idCliente = localStorage.getItem("idCliente");
    this.misviajes = new Array<Viaje>();
    this.origen = localStorage.getItem("OrigenViaje");
    this.destino = localStorage.getItem("DestinoViaje");
    this.TraerDatos();
  }

  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 2000);
  }


  TraerDatos()
  {
    this.spinner.show();
    setTimeout(() => {
        this.spinner.hide();
    }, 2000);
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
    .catch(e=>{
      this.alerts.setMessage('Fallo','error');

        });
  }

  Solicitar()  
  {
    if(this.ValidarDatos())
    {
        this.SolicitarInternal();
    }
    else
    {
     this.alerts.setMessage('Complete todos los campos.','error');
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

      this.miViaje.encuesta = "N";
      this.miViaje.idremisero = 0;

      console.log(this.miViaje); 

      if(this.miViaje.id == null)
      {
        var respuesta=  this.ViajesServ.IngresarViaje(this.miViaje,mensaje => {
          console.log(mensaje); 
         this.alerts.setMessage(mensaje,'success');
          this.Limpiar();
          this.TraerDatos();
        });
      }
      else
      {
        var respuesta=  this.ViajesServ.ModificarConID(this.miViaje,mensaje => {
          console.log(mensaje); 
          this.alerts.setMessage(mensaje,'success');
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

    localStorage.setItem("OrigenViaje","");
    localStorage.setItem("DestinoViaje","");
  }

  Borrar(id:number)
  {
        var respuesta = this.ViajesServ.BorrarViaje(id.toString(), retorno => {
          this.alerts.setMessage(retorno,'success');
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
    .catch(e=>{
      this.alerts.setMessage('Fallo','error');
    });
  }

  ValidarDatos()
  {
    var retorno = true;
    retorno = retorno && this.destino != "" && this.destino != null;
    retorno = retorno && this.origen != "" && this.origen != null;
    retorno = retorno && this.vehiculo != "" && this.vehiculo != null;
    retorno = retorno && this.nivel != "" && this.nivel != null;
    retorno = retorno && this.flag != false; 

    return retorno;
  }

  Encuesta(idviaje:number)
  {

      localStorage.setItem("idViajeEncuesta",idviaje.toString());
      this.router.navigate(['/encuesta']);
  }

  
  Validar(valorCaptcha : boolean){
    this.flag = valorCaptcha;    
    if(this.flag)
    {
     this.alerts.setMessage("Es validado",'success');
    }
    else
    {
     this.alerts.setMessage('No es validado','error')
    }
  }

  Mapa()
  {
    this.router.navigate(['/mapa']);
  }

}
