import { Component, OnInit } from '@angular/core';
import { EncuestaService } from  '../../servicios/encuesta.service';
import {Encuesta} from '../../clases/encuesta';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertsService } from 'angular-alert-module';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  pregunta1:string;
  pregunta2:string;
  pregunta3:string;
  pregunta4:string;
  pregunta5:string;
  pregunta6:string;
  pregunta7:string;
  pregunta8:string;

  constructor(private EncuestaServ:EncuestaService,
    private alerts: AlertsService,
    private spinner: NgxSpinnerService,
    private router: Router) 
  { 
    this.pregunta1 = "";
    this.pregunta2 = "";
    this.pregunta3 = "";
    this.pregunta4 = "";
    this.pregunta5 = "";
    this.pregunta6 = "";
    this.pregunta7 = "";
    this.pregunta8 = "";
    localStorage.getItem("idCliente");
  }

  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 2000);
  }

  preguntaSiete(respuesta:string)
  {
    this.pregunta7 = respuesta;
  }

  cargarEncuesta()
  {
    var element = <HTMLInputElement> document.getElementById("option1");
    if(element.checked)
      this.pregunta5 = "1";
    var element2 = <HTMLInputElement> document.getElementById("option2");
    if(element2.checked)
      this.pregunta5 = "2";
    var element3 = <HTMLInputElement> document.getElementById("option3");
    if(element3.checked)
      this.pregunta5 = "3";
    var element4 = <HTMLInputElement> document.getElementById("option4");
    if(element4.checked)
      this.pregunta5 = "4";
    var element5 = <HTMLInputElement> document.getElementById("option5");
    if(element5.checked)
      this.pregunta5 = "5";
    var element6 = <HTMLInputElement> document.getElementById("option6");
    if(element6.checked)
      this.pregunta5 = "6";
    var element7 = <HTMLInputElement> document.getElementById("option7");
    if(element7.checked)
      this.pregunta5 = "7";
    var element8 = <HTMLInputElement> document.getElementById("option8");
    if(element8.checked)
      this.pregunta5 = "8";
    var element9 = <HTMLInputElement> document.getElementById("option9");
    if(element9.checked)
      this.pregunta5 = "9";
    var element10 = <HTMLInputElement> document.getElementById("option10");
    if(element10.checked)
      this.pregunta5 = "10";

    var checkbox1 = <HTMLInputElement> document.getElementById("checkbox1");
    if(checkbox1.checked)
      this.pregunta4 = " Amable." + this.pregunta4;
    var checkbox2 = <HTMLInputElement> document.getElementById("checkbox2");
    if(checkbox2.checked)
      this.pregunta4 = " Educado." + this.pregunta4;
    var checkbox3 = <HTMLInputElement> document.getElementById("checkbox3");
    if(checkbox3.checked)
      this.pregunta4 = " Respeta señales de transito." + this.pregunta4;
    var checkbox4 = <HTMLInputElement> document.getElementById("checkbox4");
    if(checkbox4.checked)
      this.pregunta4 = " Atento al camino." + this.pregunta4;

    var ch1 = <HTMLInputElement> document.getElementById("CH1");
    if(ch1.checked)
      this.pregunta1 = "SI";
    else
      this.pregunta1 = "NO";

      var ch8 = <HTMLInputElement> document.getElementById("CH8");
      if(ch8.checked)
        this.pregunta8 = "SI";
      else
        this.pregunta8 = "NO";

      if(this.ValidarDatos())
      {
          var encuesta = new Encuesta();
          encuesta.idviaje = localStorage.getItem("idViajeEncuesta");
          encuesta.pregunta1 = this.pregunta1;
          encuesta.pregunta2 = this.pregunta2;
          encuesta.pregunta3 = this.pregunta3;
          encuesta.pregunta4 = this.pregunta4;
          encuesta.pregunta5 = this.pregunta5;
          encuesta.pregunta6 = this.pregunta6;
          encuesta.pregunta7 = this.pregunta7;
          encuesta.pregunta8 = this.pregunta8;
          encuesta.respEncuesta = "S";
          
          var respuesta=  this.EncuestaServ.IngresarmiEncuesta(encuesta,mensaje => {
            console.log(mensaje); 
            this.alerts.setMessage(mensaje,'success');
            this.Limpiar();
            this.router.navigate(['/pedido']);
          });
      }
      else
      {
        this.alerts.setMessage('Complete todos los campos.','error')
      }

  }

  ValidarDatos()
  {
    var retorno = true;
    retorno = retorno && this.pregunta1 != "";
    retorno = retorno && this.pregunta2 != "";
    retorno = retorno && this.pregunta3 != "";
    retorno = retorno && this.pregunta4 != "";
    retorno = retorno && this.pregunta5 != "";
    retorno = retorno && this.pregunta6 != "";
    retorno = retorno && this.pregunta7 != "";
    retorno = retorno && this.pregunta8 != "";
    return retorno;
  }

  Limpiar()
  {
      this.pregunta1 = "";
      this.pregunta2 = "";
      this.pregunta3 = "";
      this.pregunta4 = "";
      this.pregunta5 = "";
      this.pregunta6 = "";
      this.pregunta7 = "";
      this.pregunta8 = "";
  }

}
