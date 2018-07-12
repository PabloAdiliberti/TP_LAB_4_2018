import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
      case "Pablo":{
        this.username="remisero1@remisero1.com";
        this.password="remisero1";
        break;}                
      case "Jorge":{
        this.username="remisero2@remisero2.com";
        this.password="remisero2";
        break;}
      case "Jose":{
        this.username="remisero3@remisero3.com";
        this.password="remisero3";
      break;}
      case "Angel":{
        this.username="remisero4@remisero4.com";
        this.password="remisero4";
      break;}
      case "Carlos":{
        this.username="remisero5@remisero5.com";
        this.password="remisero5";
      break;}
      case "Roberto":{
        this.username="remisero6@remisero6.com";
        this.password="remisero6";
      break;}
      case "Ariel":{
        this.username="remisero7@remisero7.com";
        this.password="remisero7";
      break;}
      case "Gonzalo":{
        this.username="remisero8@remisero8.com";
        this.password="remisero8";
      break;}
      case "Emiliano":{
        this.username="remisero9@remisero9.com";
        this.password="remisero9";
      break;}
      case "Mauro":{
        this.username="remisero10@remisero10.com";
        this.password="remisero10";
      break;}
      case "cliente5":{
        this.username="cliente5@cliente5.com";
        this.password="cliente5";
      break;} 
      case "cliente6":{
        this.username="cliente6@cliente6.com";
        this.password="cliente6";
      break;} 
      case "cliente7":{
        this.username="cliente7@cliente7.com";
        this.password="cliente7";
      break;} 
      case "cliente8":{
        this.username="cliente8@cliente8.com";
        this.password="cliente8";
      break;} 
      case "cliente9":{
        this.username="cliente9@cliente9.com";
        this.password="cliente9";
      break;} 
      case "cliente10":{
        this.username="cliente10@cliente10.com";
        this.password="cliente10";
      break;}          
    }
  }



}
