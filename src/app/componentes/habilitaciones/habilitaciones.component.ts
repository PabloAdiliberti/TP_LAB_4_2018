import { Component, OnInit } from '@angular/core';
import {Remisero} from '../../clases/remisero';
import {Vehiculo} from '../../clases/vehiculo';
import { RemiseroService } from  '../../servicios/remisero.service';
import { VehiculoService } from  '../../servicios/vehiculo.service';

@Component({
  selector: 'app-habilitaciones',
  templateUrl: './habilitaciones.component.html',
  styleUrls: ['./habilitaciones.component.css']
})
export class HabilitacionesComponent implements OnInit {

  lista:any;
  RemiserosList : Array<Remisero>
  listaVehiculos:any;
  VehiculosList : Array<Vehiculo>

  constructor(private RemiseroServ:RemiseroService,private VehiculoServ:VehiculoService) {
    this.TraerDatos();
   }

  ngOnInit() {
  }


  TraerDatos()
  {
    this.RemiserosList = null;
    this.RemiserosList = new Array<Remisero>();
    this.RemiseroServ.TraerRemiseros()
    .then(lista=>{
      this.lista=lista;     
      for (let index = 0; index < this.lista.length; index++) {
          this.RemiserosList.push(this.lista[index]);      
       }
       this.TraerDatosVehiculos();
        
    })
    .catch(e=>{alert("Fallo")});
    console.log(this.RemiserosList);
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
    //console.log(this.VehiculosList);
  }

  CargarNombreVehiculo()
  {
    
    for (let index = 0; index < this.RemiserosList.length; index++)
    {
      for (let j = 0; j < this.VehiculosList.length; j++)
      {
          if(this.RemiserosList[index].idvehiculo == this.VehiculosList[j].id)
          {
            this.RemiserosList[index].vehiculo = this.VehiculosList[j].modelo;
          }
      }
    }
  }

  Guardar(id:number)
  {
    var element = <HTMLInputElement> document.getElementById(id.toString());
    var isChecked = element.checked;
    for (let index = 0; index < this.RemiserosList.length; index++)
    {
      if(this.RemiserosList[index].id == id.toString())
      {
        if(isChecked)
        {
          this.RemiserosList[index].habilitado = "S";
        }
        else
        {
          this.RemiserosList[index].habilitado = "N";
        }

          this.RemiseroServ.ModificarRemisero(this.RemiserosList[index],mensaje => {
         // console.log(mensaje); 
          alert(mensaje);
          this.TraerDatos();
        });
      }
     
    }
    
  }

  GuardarVehiculo(id:number)
  {
    var element = <HTMLInputElement> document.getElementById(id.toString());
    var isChecked = element.checked;

    for (let index = 0; index < this.VehiculosList.length; index++)
    {
      if(this.VehiculosList[index].id == id.toString())
      {
        if(isChecked)
        {
          this.VehiculosList[index].habilitado = "S";
        }
        else
        {
          this.VehiculosList[index].habilitado = "N";
        }

          this.VehiculoServ.ModificarVehiculo(this.VehiculosList[index],mensaje => { 
          alert(mensaje);
          this.TraerDatos();
        });
      }
     
    }

  }

}
