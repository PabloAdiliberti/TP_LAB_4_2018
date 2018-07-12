import { Component, OnInit } from '@angular/core';
import { VehiculoService } from  '../../servicios/vehiculo.service';
import { RemiseroService } from  '../../servicios/remisero.service';
import {Remisero} from '../../clases/remisero';
import {Vehiculo} from '../../clases/vehiculo';
import { AlertsService } from 'angular-alert-module';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(private RemiseroS:RemiseroService,
    private spinner: NgxSpinnerService,
    private alerts: AlertsService,
    private VehiculoS:VehiculoService
  ) {
    this.traerDatos();
   }

  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 2000);
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
        console.log(this.remiserosSinAuto);
        console.log(this.remiserosConAuto);
        this.traerVehiculos();
    })
    .catch(e=>{ 
      this.alerts.setMessage('Fallo','error');
      });    
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
    .catch(e=>{
      this.alerts.setMessage('Fallo','error')
    });   
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

    if(remisero.id != "" && remisero.idvehiculo != "")
    {
      this.RemiseroS.ModificarIdVehiculo(remisero,mensaje => {
      this.alerts.setMessage(mensaje,'success')
       this.traerDatos();
     });
    }
    else{
      this.alerts.setMessage('Complete todo los campos.','error')
    }
  }


  Modificar(id:number)
  {

    var remisero = new Remisero();
    remisero.id = id.toString();
    remisero.idvehiculo = "0";
    remisero.habilitado = "N";

    this.RemiseroS.ModificarIdVehiculo(remisero,mensaje => {
      this.alerts.setMessage(mensaje,'success');
       this.traerDatos();
     });
  }

}
