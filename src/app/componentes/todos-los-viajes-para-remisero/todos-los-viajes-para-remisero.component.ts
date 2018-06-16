import { Component, OnInit } from '@angular/core';
import { ViajesService } from  '../../servicios/viajes.service';
import { RemiseroService } from  '../../servicios/remisero.service';
import {Viaje} from '../../clases/viaje';
import {Remisero} from '../../clases/remisero';


@Component({
  selector: 'app-todos-los-viajes-para-remisero',
  templateUrl: './todos-los-viajes-para-remisero.component.html',
  styleUrls: ['./todos-los-viajes-para-remisero.component.css']
})
export class TodosLosViajesParaRemiseroComponent implements OnInit {

  viajes:any;
  misviajes : Array<Viaje>
  idRemisero :string;
  
  constructor(private ViajesServ:ViajesService,private RemiseroServ:RemiseroService) {
    this.TraerID();
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
          if(this.viajes[index].idremisero == this.idRemisero)  
          {
            this.misviajes.push(this.viajes[index]);
          }
           
         }
        // console.log(this.viajes); 
         //this.TraerRemisero()
    })
    .catch(e=>{alert("Fallo")});  
  }

  TraerID()
  {
    this.RemiseroServ.TraerUnRemiseroPorUsuario(localStorage.getItem("idCliente"))
    .then(
      remisero=>{  
        this.idRemisero = remisero.id;
        this.TraerDatos();
    })
    .catch(e=>{alert("Fallo")});
  }

}
