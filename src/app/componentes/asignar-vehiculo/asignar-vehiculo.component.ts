import { Component, OnInit } from '@angular/core';
import { VehiculoService } from  '../../servicios/vehiculo.service';
import { RemiseroService } from  '../../servicios/remisero.service';
import {Remisero} from '../../clases/remisero';
import {Vehiculo} from '../../clases/vehiculo';

@Component({
  selector: 'app-asignar-vehiculo',
  templateUrl: './asignar-vehiculo.component.html',
  styleUrls: ['./asignar-vehiculo.component.css']
})
export class AsignarVehiculoComponent implements OnInit {

  remiseros:any;
  vehiculos:any;

  remiserosSinAuto:Array<Remisero>;
  remiserosConAuto:Array<Remisero>;

  vehiculoSinDueno:Array<Vehiculo>;
  todosLosVehiculos:Array<Vehiculo>;

  constructor(private RemiseroS:RemiseroService,private VehiculoS:VehiculoService) {
    this.traerDatos();
   }

  ngOnInit() {
  }

  traerDatos()
  {
    this.remiserosSinAuto = new Array<Remisero>();
    this.remiserosConAuto = new Array<Remisero>();

    this.RemiseroS.TraerRemiseros() 
    .then(
      lista=>{this.remiseros=lista; 
        for (let index = 0; index < this.remiseros.length; index++) {
          if(this.remiseros[index].idvehiculo == "0")
          {
            this.remiserosSinAuto.push(this.remiseros[index]);
          }
          else
          {
            this.remiserosConAuto.push(this.remiseros[index]);
          }
         }    
        //console.log(this.remiserosSinAuto);
        console.log(this.remiserosConAuto);
        this.traerVehiculos();
    })
    .catch(e=>{alert("Fallo")});    
  }

  traerVehiculos()
  {
    this.vehiculoSinDueno = new Array<Vehiculo>();
    this.todosLosVehiculos = new Array<Vehiculo>();
    var sinvehiculo = new Vehiculo();
    sinvehiculo.modelo = "DESASIGNAR VEHICULO";
    sinvehiculo.id = "0";
    this.todosLosVehiculos.push(sinvehiculo);

    var flag = true;

    this.VehiculoS.TraerVehiculos() 
    .then(
      lista=>{this.vehiculos=lista; 
        for (let index = 0; index < this.vehiculos.length; index++) 
        {
          this.todosLosVehiculos.push(this.vehiculos[index]);
          flag = true;
          for (let j = 0; j < this.remiserosConAuto.length; j++) 
          {
            if(this.vehiculos[index].id == this.remiserosConAuto[j].idvehiculo)
            {
                flag = false;
            }
          }
          if(flag)
          {
            this.vehiculoSinDueno.push(this.vehiculos[index]);
          }
        } 
        //console.log(this.vehiculoSinDueno);
    })
    .catch(e=>{alert("Fallo")});   
  }

  Asignar()
  {
    var element = <HTMLInputElement> document.getElementById("1");
    var idremisero = element.value;
   
    var element2 = <HTMLInputElement> document.getElementById("2");
    var idvehiculo = element2.value;

    var remisero = new Remisero();
    remisero.id = idremisero;
    remisero.idvehiculo = idvehiculo;
    remisero.habilitado = "S";

    this.RemiseroS.ModificarIdVehiculo(remisero,mensaje => {
       alert(mensaje);
       this.traerDatos();
     });
  }


  Modificar(id:number)
  {

    var remisero = new Remisero();
    remisero.id = id.toString();
    remisero.idvehiculo = "0";
    remisero.habilitado = "N";

    this.RemiseroS.ModificarIdVehiculo(remisero,mensaje => {
       alert(mensaje);
       this.traerDatos();
     });
  }

}
