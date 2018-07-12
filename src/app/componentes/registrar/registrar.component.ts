import { Component, OnInit } from '@angular/core';
import { PersonaService } from  '../../servicios/persona.service';
import {Usuario} from '../../clases/usuario';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertsService } from 'angular-alert-module';
import { NgxSpinnerService } from 'ngx-spinner';

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
  
  elCaptcha : string = '';
  constructor(private Usuarios:PersonaService,
    private alerts: AlertsService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

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
         this.alerts.setMessage(retorno,'success');
          this.Limpiar();
        });
      }
    else
    {
   this.alerts.setMessage('Verifique los datos. Complete todos los campos e ingrese una clave mayor a 6 digitos.','error')
      this.Limpiar();
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
    retorno = retorno && this.elCaptcha != "" && this.elCaptcha != null;
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

  resolved(captchaResponse: string) {
    this.elCaptcha = captchaResponse;
  }

}
