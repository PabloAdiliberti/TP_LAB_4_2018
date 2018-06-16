import { Component, OnInit } from '@angular/core';
//import { UsuariosService } from  '../../servicios/usuarios.service';
import { PersonaService } from  '../../servicios/persona.service';
import {Usuario} from '../../clases/usuario';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  nombre:string;
  tipo:string;
  edad:string;
  mail:string;
  clave:string;
  clave2:string;
  foto:string;
  MiUsuario:Usuario;

  constructor(private Usuarios:PersonaService
    ,private router: Router) { }

  ngOnInit() {
  }

  Registrar()
  {
    if(this.ValidarDatos())
      {
        this.MiUsuario = new Usuario();
        
        this.MiUsuario.nombre = this.nombre;
        this.MiUsuario.tipo = "cliente";
        this.MiUsuario.edad = this.edad;
        this.MiUsuario.mail = this.mail;
        this.MiUsuario.clave = this.clave;
        // this.MiUsuario.foto = this.foto;

        var respuesta = this.Usuarios.APIIngresar(this.MiUsuario, retorno => {
         // console.log(retorno); 
          alert(retorno);
          this.Limpiar();
        });
      }
    else
    {
      alert("Verifique los datos. Complete todos los campos e ingrese una clave mayor a 6 digitos.");
    }
  }

  Salir(){
    this.router.navigate(['/inicio']);
  }

  ValidarDatos()
  {
    var retorno = true;
    retorno = retorno && this.nombre != "" && this.nombre != null;
    retorno = retorno && this.edad != "" && this.edad != null;
    retorno = retorno && this.mail != "" && this.mail != null;
    retorno = retorno && this.clave != "" && this.clave != null;
    retorno = retorno && this.clave2 != "" && this.clave2 != null;
    retorno = retorno && this.clave == this.clave2;
    retorno = retorno && this.clave.length >= 6;
    retorno = retorno && this.mail.indexOf('@') != -1;

    return retorno;
  }

  Limpiar()
  {
    this.nombre = "";
    this.tipo= "";
    this.edad= "";
    this.mail= "";
    this.clave= "";
    this.clave2= "";
    this.foto= "";
    this.MiUsuario= null;
  }

}
