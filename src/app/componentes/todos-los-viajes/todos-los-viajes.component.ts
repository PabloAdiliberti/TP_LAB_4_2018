import { Component, OnInit } from '@angular/core';
import { ViajesService } from  '../../servicios/viajes.service';
import { RemiseroService } from  '../../servicios/remisero.service';
import {Viaje} from '../../clases/viaje';
import {Remisero} from '../../clases/remisero';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AlertsService } from 'angular-alert-module';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-todos-los-viajes',
  templateUrl: './todos-los-viajes.component.html',
  styleUrls: ['./todos-los-viajes.component.css']
})
export class TodosLosViajesComponent implements OnInit {

  remiseros:any;
  viajes:any;
  misviajes : Array<Viaje>
  misremisero : Array<Remisero>

  constructor(private ViajesServ:ViajesService,
    private alerts: AlertsService,
    private spinner: NgxSpinnerService,
    private RemiseroServ:RemiseroService) {
    this.TraerDatos();

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
   }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
        this.spinner.hide();
    }, 2000);
  }
 
  TraerDatos()
  {
    this.spinner.show();
    this.misviajes = null;
    this.misviajes = new Array<Viaje>();
    this.ViajesServ.TraerViajes()
    .then(
      lista=>{this.viajes=lista;     
        for (let index = 0; index < this.viajes.length; index++) 
         {
            this.misviajes.push(this.viajes[index]);          
         }
         console.log(this.viajes); 
         this.TraerRemisero();
    })
    .catch(e=>{
      this.alerts.setMessage('Fallo','error');  
        });
   
  }

  TraerRemisero()
  {
    this.misremisero = new Array<Remisero>();
    this.RemiseroServ.TraerRemiseros() 
    .then(
      lista=>{this.remiseros=lista; 
        for (let index = 0; index < this.misviajes.length; index++) 
        {
          for (let j = 0; j < this.remiseros.length; j++) 
          {
            if(this.viajes[index].idremisero == this.remiseros[j].id )
            {
              this.viajes[index].nombreremisero = this.remiseros[j].nombre
            }
          }
        } 
        
        //console.log(this.misviajes); 
        //console.log(this.remiseros); 
    })
    .catch(e=>{
      this.alerts.setMessage('Fallo','error')
    });  
    
  }

  DescargarPDF()
  {
    var minuevopdf = this.FormartPDF();
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var dd = { content: "Mis viajes: \n\n" + minuevopdf };
    pdfMake.createPdf(dd).download();
  }

  FormartPDF()
  {
    var mipdf = "";
    for (let index = 0; index < this.misviajes.length; index++) 
    {
      mipdf = mipdf + "VIAJE NUEMERO"+(index+1)+":\n"
      mipdf = mipdf + "Remisero: " + this.misviajes[index].nombreremisero + "\n"+
              "Origen: "+this.misviajes[index].origen+  "\n" +
              "Destino: "+this.misviajes[index].destino+  "\n"+
              "Fecha: "+this.misviajes[index].fecha+this.misviajes[index].hora +"\n"+
              "Medio de pago: "+this.misviajes[index].mediopago+  "\n\n";
    }
    return mipdf;
  }



  download(){
    var csvData = this.ConvertToCSV(this.CortarArray());
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
   // let fecha1 = this.fecha.split('-');
  
    a.download = "Listado de Viajes.csv";
    a.click();
  }


  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";
  
    for (var index in objArray[0]) {
        //Now convert each value to string and comma-separated
        row += index + ';';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';
  
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ';'
  
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
  }

  CortarArray()
  {
    var viajesFormatiados = Array<Viaje>();
    viajesFormatiados = new Array<Viaje>();

    for (let index = 0; index < this.misviajes.length; index++) 
    {
      var unviaje = new Viaje();
      unviaje.estado  =  this.misviajes[index].estado;
      unviaje.origen  =  this.misviajes[index].origen;
      unviaje.destino  =  this.misviajes[index].destino;
      unviaje.fecha  =  this.misviajes[index].fecha;
      unviaje.hora  =  this.misviajes[index].hora;
      unviaje.mediopago  =  this.misviajes[index].mediopago;
      unviaje.monto  =  this.misviajes[index].monto;
      unviaje.prestacion  =  this.misviajes[index].prestacion;
      unviaje.nivel  =  this.misviajes[index].nivel;
      unviaje.nombreremisero  =   this.misviajes[index].nombreremisero;
      viajesFormatiados.push(unviaje);
    }
    return viajesFormatiados;
  }

}
