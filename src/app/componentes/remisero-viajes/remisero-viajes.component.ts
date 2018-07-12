import { Component, OnInit } from '@angular/core';
import { ViajesService } from  '../../servicios/viajes.service';
import { RemiseroService } from  '../../servicios/remisero.service';
import {Viaje} from '../../clases/viaje';
import {Remisero} from '../../clases/remisero';
import { AlertsService } from 'angular-alert-module';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-remisero-viajes',
  templateUrl: './remisero-viajes.component.html',
  styleUrls: ['./remisero-viajes.component.css']
})
export class RemiseroViajesComponent implements OnInit {

  viajes:any;
  misviajes : Array<Viaje>
  idUsuario:string;
  idRemisero:string;

  constructor(private ViajesServ:ViajesService,
    private alerts: AlertsService,
    private spinner: NgxSpinnerService,
    private RemiseroServ:RemiseroService,) {
    this.idUsuario = localStorage.getItem("idCliente");

    this.TraerDatosRemisero();
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
    this.misviajes = null;
    this.misviajes = new Array<Viaje>();
    this.ViajesServ.TraerViajes()
    .then(
      lista=>{this.viajes=lista;     
        for (let index = 0; index < this.viajes.length; index++) {
          if(this.viajes[index].estado == "Solicitado" && this.viajes[index].idremisero == this.idRemisero )
           {
             this.misviajes.push(this.viajes[index]);
           }
         }
         console.log(this.misviajes); 
    })
    .catch(e=>{
      this.alerts.setMessage('Fallo','error')
    });   
  }


  TraerDatosRemisero()
  {

    this.RemiseroServ.TraerUnRemiseroPorUsuario(this.idUsuario)
    .then(
      remisero=>{  
        this.idRemisero = remisero.id;
        this.TraerDatos();

    })
    .catch(e=>{
      this.alerts.setMessage('Fallo','error');

      });
  }

  AsignarPago(id:number)
  {

    var element = <HTMLInputElement> document.getElementById(id.toString());
    var medioPago = element.value;
    
    var element2 = <HTMLInputElement> document.getElementsByName(id.toString())[0];
    console.log(element2.value);

    var Monto = element2.value;

    var viaje = new Viaje();
    viaje.id = id;
    viaje.mediopago = medioPago;
    viaje.estado = "Finalizado";
    viaje.monto = Monto;
    viaje.enviaje = "N";
    viaje.idremisero = +this.idRemisero;

    if(medioPago != "" && medioPago != null && Monto != null &&  Monto != "" &&+Monto > 0)
    { 
       var respuesta=  this.ViajesServ.ModificarViajePorMedioPago(viaje,mensaje => {
        this.alerts.setMessage(mensaje,'success');
        this.TraerDatos();
      });
    }
    else
    {
      this.alerts.setMessage('Complete todo los campos','error')
    }
  }
}
