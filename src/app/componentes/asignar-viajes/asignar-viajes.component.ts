import { Component, OnInit } from '@angular/core';
import { ViajesService } from  '../../servicios/viajes.service';
import { RemiseroService } from  '../../servicios/remisero.service';
import { VehiculoService } from  '../../servicios/vehiculo.service';
import {Viaje} from '../../clases/viaje';
import {Remisero} from '../../clases/remisero';
import {Vehiculo} from '../../clases/vehiculo';

@Component({
  selector: 'app-asignar-viajes',
  templateUrl: './asignar-viajes.component.html',
  styleUrls: ['./asignar-viajes.component.css']
})
export class AsignarViajesComponent implements OnInit {

  viajes:any;
  misviajes : Array<Viaje>
  RemiserosList : Array<Remisero>
  lista:any;
  listaVehiculos:any;
  VehiculosList : Array<Vehiculo>

  remiserosCombo:Array<Remisero>;

  constructor(private ViajesServ:ViajesService,
    private RemiseroServ:RemiseroService,
    private VehiculoServ:VehiculoService) {
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
          if(this.viajes[index].estado == "Solicitado" && this.viajes[index].idremisero == 0)
           {
            this.misviajes.push(this.viajes[index]);
           }
         }
         this.TraerDatosRemiseros();
         console.log(this.viajes); 
    })
    .catch(e=>{alert("Fallo")});
   
  }

  TraerDatosRemiseros()
  {
    this.RemiserosList = null;
    this.RemiserosList = new Array<Remisero>();
    this.RemiseroServ.TraerRemiseros()
    .then(lista=>{
      this.lista=lista;     
      for (let index = 0; index < this.lista.length; index++) {
        if(this.lista[index].habilitado == "S")
          {
            this.RemiserosList.push(this.lista[index]); 
          }    
       }
       this.TraerDatosVehiculos();
        
    })
    .catch(e=>{alert("Fallo")});
  }

  TraerDatosVehiculos()
  {
    this.VehiculosList = null;
    this.VehiculosList = new Array<Vehiculo>();
    this.VehiculoServ.TraerVehiculos()
    .then(lista=>{
      this.listaVehiculos=lista;     
      for (let index = 0; index < this.listaVehiculos.length; index++) {
          this.VehiculosList.push(this.listaVehiculos[index]);   
          this. CargarNombreVehiculo() 
       }      
    })
    .catch(e=>{alert("Fallo")});

  }

  CargarNombreVehiculo()
  {
    this.remiserosCombo = new Array<Remisero>();
    for (let index = 0; index < this.RemiserosList.length; index++)
    {
      for (let j = 0; j < this.VehiculosList.length; j++)
      {
          if(this.RemiserosList[index].idvehiculo == this.VehiculosList[j].id && this.RemiserosList[index].enviaje == "N")
          {
            var remisero = new Remisero();
            remisero.id = this.RemiserosList[index].id;
            remisero.nombre = this.RemiserosList[index].nombre+" - "+this.VehiculosList[j].tipo+" - "+this.VehiculosList[j].comodidad;
            this.remiserosCombo.push(remisero);
            this.RemiserosList[index].vehiculo = this.VehiculosList[j].modelo;
            this.RemiserosList[index].tipoVehiculo =this.VehiculosList[j].tipo;
          }
      }
    }
  }

  Asignar(id:number)
  {

    var element = <HTMLInputElement> document.getElementById(id.toString());
    var idRemisero = element.value;

    if(idRemisero != "" && idRemisero != null)
    {
      var viaje = new Viaje();
      viaje.id = id;
      viaje.idremisero = +idRemisero;
      viaje.enviaje = "S";

      var respuesta=  this.ViajesServ.ModificarViajeParaRemisero(viaje,mensaje => {
        alert(mensaje);
        this.TraerDatos();
      });
    }
    else
    {
       alert("Seleccion un remisero.");
    }
  }



}
