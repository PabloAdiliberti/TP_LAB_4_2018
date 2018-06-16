import { Component, OnInit } from '@angular/core';
import { ViajesService } from  '../../servicios/viajes.service';
import { RemiseroService } from  '../../servicios/remisero.service';
import {Viaje} from '../../clases/viaje';
import {Remisero} from '../../clases/remisero';

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

  constructor(private ViajesServ:ViajesService,private RemiseroServ:RemiseroService,) {
    this.idUsuario = localStorage.getItem("idCliente");
    //alert(this.idUsuario);
    //this.TraerDatos();
    //this.miRemisero = new Remisero();
    this.TraerDatosRemisero();
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
          if(this.viajes[index].estado == "Solicitado" && this.viajes[index].idremisero == this.idRemisero )
           {
             this.misviajes.push(this.viajes[index]);
           }
         }
         console.log(this.misviajes); 
    })
    .catch(e=>{alert("Fallo")});   
  }


  TraerDatosRemisero()
  {
    this.RemiseroServ.TraerUnRemiseroPorUsuario(this.idUsuario)
    .then(
      remisero=>{  
        this.idRemisero = remisero.id;
        this.TraerDatos();
    })
    .catch(e=>{alert("Fallo")});
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

    if(medioPago != null && Monto != null && +Monto > 0)
    { 
       var respuesta=  this.ViajesServ.ModificarViajePorMedioPago(viaje,mensaje => {
        alert(mensaje);
        this.TraerDatos();
      });
    }
    else
    {
      alert("Complete todo los campos");
    }
  }
}
