import { Component, OnInit } from '@angular/core';
import { PersonaService } from  '../../servicios/persona.service';
import { VehiculoService } from  '../../servicios/vehiculo.service';
import {Usuario} from '../../clases/usuario';
import {Vehiculo} from '../../clases/vehiculo';
import { AlertsService } from 'angular-alert-module';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.css']
})
export class AltasComponent implements OnInit {

  usuarios:any;
  usuariosCombo:Array<Usuario>;

  nivel:string;
  tipo:string;
  modelo:string;



  constructor(private PersonaS:PersonaService,
   private alerts: AlertsService,
    private spinner: NgxSpinnerService,
    private VehiculoS:VehiculoService) {
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
    this.usuariosCombo = new Array<Usuario>();
    this.PersonaS.TraerTodosLosUsuarios() 
    .then(
      lista=>{this.usuarios=lista;     
        for (let index = 0; index < this.usuarios.length; index++) {
          if(this.usuarios[index].tipo == "cliente")
          {
            var usuario = new Usuario();
            usuario.id = this.usuarios[index].id;
            usuario.nombre = this.usuarios[index].nombre+" - "+this.usuarios[index].mail;
            this.usuariosCombo.push(usuario);
          }
         }
    })
    .catch(e=>{
      this.alerts.setMessage('Fallo','error'); 

    });    
  }

  ActualizarARemisero()
  {
    var element = <HTMLInputElement> document.getElementById("idUsuarios");
    var idRemisero = element.value;

    var miusuario = new Usuario();
    miusuario.tipo = "remisero";
    miusuario.id = idRemisero;

    if(idRemisero != "" && idRemisero != null)
     {
        var respuesta = this.PersonaS.IngresarRemisero(miusuario, retorno => {
        this.alerts.setMessage(retorno,'success');
        this.traerDatos();
      });
     }
     else
     {
       this.alerts.setMessage('Eliga un usuario.','error');
     }

  }

  AltaVehiculo()
  {
      var vehiculo = new Vehiculo();
      vehiculo.modelo = this.modelo;
      vehiculo.tipo = this.tipo;
      vehiculo.comodidad = this.nivel;
      vehiculo.foto = "";
      vehiculo.habilitado = "S";


      if(this.modelo != "" && this.modelo != null && this.tipo != "" && this.tipo != null && this.nivel != "" && this.nivel != null)
      {  
        var respuesta=  this.VehiculoS.IngresarmiVehiculo(vehiculo,mensaje => {
          console.log(mensaje); 
          this.alerts.setMessage(mensaje,'success');
          this.Limpiar();
        });
      }
      else
      {
       this.alerts.setMessage('Complete todo los campos.','error');
      }
  }

  Limpiar()
  {
   this.nivel = "";
    this.tipo = "";
    this.modelo = "";
  }



}
