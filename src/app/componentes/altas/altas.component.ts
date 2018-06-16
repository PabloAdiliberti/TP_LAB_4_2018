import { Component, OnInit } from '@angular/core';
import { PersonaService } from  '../../servicios/persona.service';
import { VehiculoService } from  '../../servicios/vehiculo.service';
import {Usuario} from '../../clases/usuario';
import {Vehiculo} from '../../clases/vehiculo';


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

  constructor(private PersonaS:PersonaService,private VehiculoS:VehiculoService) {
    //this.tipo = "Seleccione tipo vehiculo";
    //this.nivel = "Seleccione nivel de comodidad";
    this.traerDatos();
   }

  ngOnInit() {
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
    .catch(e=>{alert("Fallo")});    
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
        alert(retorno);
        this.traerDatos();
      });
     }
     else
     {
       alert("Eliga un usuario.")
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
          alert(mensaje);
          this.Limpiar();
        });
      }
      else
      {
        alert("Complete todo los campos.")
      }
  }

  Limpiar()
  {
   this.nivel = "";
    this.tipo = "";
    this.modelo = "";
  }

}
