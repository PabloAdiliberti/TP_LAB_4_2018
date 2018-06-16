import { Component, OnInit } from '@angular/core';
import { ViajesService } from  '../../servicios/viajes.service';
import { RemiseroService } from  '../../servicios/remisero.service';
import {Viaje} from '../../clases/viaje';
import {Remisero} from '../../clases/remisero';


@Component({
  selector: 'app-todos-los-viajes',
  templateUrl: './todos-los-viajes.component.html',
  styleUrls: ['./todos-los-viajes.component.css']
})
export class TodosLosViajesComponent implements OnInit {

  remiseros:any;
  viajes:any;
  misviajes : Array<Viaje>
  misremisero : Array<Remisero>

  constructor(private ViajesServ:ViajesService,private RemiseroServ:RemiseroService) {
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
            this.misviajes.push(this.viajes[index]);
           
         }
        // console.log(this.viajes); 
         this.TraerRemisero()
    })
    .catch(e=>{alert("Fallo")});
   
  }

  TraerRemisero()
  {
    this.misremisero = new Array<Remisero>();
    this.RemiseroServ.TraerRemiseros() 
    .then(
      lista=>{this.remiseros=lista; 
        for (let index = 0; index < this.misviajes.length; index++) 
        {
          for (let j = 0; j < this.remiseros.length; j++) 
          {
            if(this.viajes[index].idremisero == this.remiseros[j].id )
            {
              this.viajes[index].nombreremisero = this.remiseros[j].nombre
            }
          }
        }    
    })
    .catch(e=>{alert("Fallo")});  
    
  }

}
