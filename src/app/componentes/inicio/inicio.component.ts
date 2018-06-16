import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
//import { Login } from '../../Clase/login';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
//import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { PersonaService } from  '../../servicios/persona.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  username:string;
  password:string;
  tipo:string;
  

  constructor(private route: ActivatedRoute,
              private router: Router,
              private PersonaS:PersonaService
             )
  {
    //this.miUsuario = new Login(route,router,_auth);
    
    //console.info(this.users);
  }

  ngOnInit() {
  }
  
  Registrarse(){
    
        this.router.navigate(['/registrar']);
    }

  login()
  {
      if(this.username==null || this.password==null)
        {
          alert("Debe completar Email y Clave");
        }
        else
          {

            //gererartoken
        var respuesta=  this.PersonaS.GenerarToken(this.username,this.password, token => { 
          if(token!=undefined)
            {
             // localStorage.clear();
              localStorage.setItem("token",token);
              localStorage.setItem("username", this.username); 
              this.router.navigate(['/principal']);          
            }
        });
      } 
  }

  UserValido()
  {
    switch(this.tipo){
      case "admin":{
        this.username="admin@admin.com";
        this.password="111111";
        break;}
      case "usuario":{
        this.username="usuario@usuario.com";
        this.password="333333";
        break;}
      case "remisero1":{
        this.username="remisero1@remisero1.com";
        this.password="remisero1";
        break;}                
      case "remisero6":{
        this.username="remisero6@remisero6.com";
        this.password="remisero6";
        break;}
      case "cliente5":{
        this.username="cliente5@cliente5.com";
        this.password="cliente5";
        break;}        
    }
  }

}
