import { Component, OnInit } from '@angular/core';
import { ViajesService } from  '../../servicios/viajes.service';
import { RemiseroService } from  '../../servicios/remisero.service';
import { EncuestaService } from  '../../servicios/encuesta.service';
import {Viaje} from '../../clases/viaje';
import {Remisero} from '../../clases/remisero';
import {Encuesta} from '../../clases/encuesta';
import { AlertsService } from 'angular-alert-module';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  remiseros:any;
  viajes:any;
  encuestas:any;
  misviajes : Array<Viaje>
  misremisero : Array<Remisero>
  misencuestas: Array<Encuesta>

  constructor(private ViajesServ:ViajesService,
              private alerts: AlertsService,
              private spinner: NgxSpinnerService,
              private EncuestaServ:EncuestaService,
              private RemiseroServ:RemiseroService) {
    this.TraerDatos();
    this.TraerEncuestas();
    this.spinner.show();
 

           
   }

  ngOnInit() {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
  }, 2000);
  }

  TraerDatos()
  {

    this.misviajes = null;
    this.misviajes = new Array<Viaje>();
    this.ViajesServ.TraerViajes()
    .then(
      lista=>{this.viajes=lista;     
        for (let index = 0; index < this.viajes.length; index++) {
            this.misviajes.push(this.viajes[index]);
           
         }
        // console.log(this.viajes); 
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
        this.CargarMontosDeRemisero();
      
    })
    .catch(e=>{
      this.alerts.setMessage('Fallo','error')
    });  
  }

  CargarMontosDeRemisero()
  {
    this.barChartLabels1 =  new Array<string>();
    this.otro =  new Array<number>();
    this.Efectivo =  new Array<number>();
    this.CuentaCorriente =  new Array<number>();
    var cc = 0;
    var efec = 0;

    for (let j = 0; j < this.remiseros.length; j++) 
    {
      this.remiseros[j].montoTotal = 0;
      var cc = 0;
      var efec = 0;
      this.CeroSeis = 0;
      this.SeisDoce = 0;
      this.DoceSeis = 0;
      this.SeisCero = 0;
  
      for (let index = 0; index < this.misviajes.length; index++) 
      {
        if(this.viajes[index].nombreremisero == this.remiseros[j].nombre )
        {
          this.remiseros[j].montoTotal =  +this.remiseros[j].montoTotal + +this.viajes[index].monto;
      
          if(this.viajes[index].mediopago == "Efectivo")
              efec = efec +1;
          if(this.viajes[index].mediopago == "Cuenta Corriente")
              cc = cc + 1;
        }
      }
      this.barChartLabels1.push(this.remiseros[j].nombre);
      this.otro.push(this.remiseros[j].montoTotal);

      this.Efectivo.push(efec);
      this.CuentaCorriente.push(cc);
    }
    this.barChartData1.push({data: this.otro, label: 'Monto por remisero'});
    this.barChartData.push( {data: this.Efectivo, label: 'Efectivo'},
                            {data: this.CuentaCorriente, label: 'Cuenta Corriente'});
    this.CargarHoraDeRemisero();
                            console.log(this.barChartData1);
  }

  TraerEncuestas()
  {
    this.Excelente = 0;
    this.MuyBueno = 0;
    this.Bueno = 0;
    this.Regular = 0;
    this.Malo = 0;
    this.si = 0;
    this.no = 0;
    this.Bien1 = 0;
    this.Dudoso1 = 0;
    this.Malo1 = 0;
    this.misencuestas = new Array<Encuesta>();
    this.EncuestaServ.TraerEncuestas()
    .then(
      lista=>{this.encuestas=lista;     
        for (let index = 0; index < this.encuestas.length; index++) {

            this.misencuestas.push(this.encuestas[index]);
            this.CargarPregunta3(this.encuestas[index].pregunta3);
            this.CargarPregunta1(this.encuestas[index].pregunta1);
            this.CargarPregunta7(this.encuestas[index].pregunta7);
         }
         this.doughnutChartData = [this.Excelente,this.MuyBueno,this.Bueno,this.Regular,this.Malo];
         this.pieChartData= [this.si,this.no];
         this.pieChartData1 = [this.Bien1,this.Dudoso1,this.Malo1];

    })
    .catch(e=>{
      this.alerts.setMessage('Fallo','error');
    });
  }

  CargarPregunta3(pregunta:string)
  {
    switch(pregunta){
      case "Excelente":{
        this.Excelente = this.Excelente + 1;
        break;}
      case "MuyBueno":{
        this.MuyBueno = this.MuyBueno + 1;
        break;}
      case "Bueno":{
        this.Bueno = this.Bueno + 1;
        break;} 
      case "Regular":{
        this.Regular = this.Regular + 1;
        break;} 
      case "Malo":{
        this.Malo = this.Malo + 1;
        break;}                      
    }
  }

  CargarPregunta1(pregunta:string)
  {
    switch(pregunta){
      case "SI":{
        this.si = this.si + 1;
        break;}
      case "NO":{
        this.no = this.no + 1;
        break;}                    
    }
  }

  CargarPregunta7(pregunta:string)
  {
    switch(pregunta){
      case "Bien":{
        this.Bien1 = this.Bien1 + 1;
        break;}
      case "Dudoso":{
        this.Dudoso1 = this.Dudoso1 + 1;
        break;}
      case "Malo":{
        this.Malo1 = this.Malo1 + 1;
        break;}                     
    }
  } 

  CargarHoraDeRemisero()
  {    
    this.Horas =  new Array<number>();
    for (let j = 0; j < this.remiseros.length; j++) 
    {
      this.CeroSeis = 0;
      this.SeisDoce = 0;
      this.DoceSeis = 0;
      this.SeisCero = 0;
      this.Horas = null;
      this.Horas =  new Array<number>();
      for (let index = 0; index < this.misviajes.length; index++) 
      {
        if(this.viajes[index].idremisero == this.remiseros[j].id )
        {
          this.CargarHoras(this.viajes[index].hora);
        }
      }        
      this.Horas.push(this.CeroSeis);
      this.Horas.push(this.SeisDoce);
      this.Horas.push(this.DoceSeis);
      this.Horas.push(this.SeisCero);
      this.chartData2.push({data: this.Horas, label: this.remiseros[j].nombre});     
    }
    this.chartData1 = null;
    this.chartData1 = this.chartData2;
  }

  CargarHoras(dateString:string)
  {
    let parts = dateString.split(':');
    switch(parts[0]){
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":{
        this.CeroSeis = this.CeroSeis + 1;
        break;}
      case "6":
      case "7":
      case "8":
      case "9":
      case "10":
      case "11":{
        this.SeisDoce = this.SeisDoce + 1;
      break;}
      case "12":
      case "13":
      case "14":
      case "15":
      case "16":
      case "17":{
        this.DoceSeis = this.DoceSeis + 1;
      break;}
      case "18":
      case "19":
      case "20":
      case "21":
      case "22":
      case "23":{
        this.SeisCero = this.SeisCero + 1;
      break;}
                   
    }
  }

/*1 */

public barChartOptions1:any = {
 // scaleShowVerticalLines: false,
//  responsive: true
};
public barChartType1:string = 'bar';
public barChartLegend1:boolean = true;
public barChartLabels1:string[] ;

public otro:number[];
public barChartData1:any[] = [];

/* 2 */
public barChartOptions:any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartType:string = 'bar';
public barChartLegend:boolean = true;
public CuentaCorriente:number[]; 
public Efectivo:number[]; 
public barChartData:any[] = [];

    /* 3 */
public doughnutChartLabels:string[] = ['Excelente', 'Muy Bueno', 'Bueno', 'Regular', 'Malo'];
public doughnutChartData:number[] = [0,0,0,0,0];
public doughnutChartType:string = 'doughnut';
public Excelente :number;
public MuyBueno :number;
public Bueno :number;
public Regular :number;
public Malo :number;

/*4 */
public pieChartLabels:string[] = ['SI', 'No'];
public pieChartData:number[] = [0, 0];
public pieChartType:string = 'pie';
public si :number;
public no :number;

/*5 */
public CeroSeis :number;
public SeisDoce :number;
public DoceSeis :number;
public SeisCero :number;
public Horas:number[] = [];

chartOptions1 = {
  responsive: true
};

chartData1 = [
  { data: [330, 600, 260, 700], label: 'Account 1' },
  { data: [120, 455, 100, 340], label: 'Account 2' },
  { data: [120, 455, 100, 340], label: 'Account 3' },
  { data: [120, 455, 100, 340], label: 'Account 4' },
  { data: [120, 455, 100, 340], label: 'Account 5' },
  { data: [120, 455, 100, 340], label: 'Account 6' },
  { data: [120, 455, 100, 340], label: 'Account 7' },
  { data: [120, 455, 100, 340], label: 'Account 8' },
  { data: [45, 67, 800, 500], label: 'Account 9' },
  { data: [45, 67, 800, 500], label: 'Account 9' },
];
public chartData2 = [];
chartLabels1 = ['00hs A 06hs', '06hs A 12hs', '12hs A 18hs', '18hs A 00hs'];
/*6 */
public pieChartLabels1:string[] = ['Bien','Dudoso','Malo'];
public pieChartData1:number[] = [0, 0,0];
public pieChartType1:string = 'pie';
public Bien1 :number;
public Dudoso1 :number;
public Malo1 :number;


public barChartOptions3:any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels3:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
public barChartType3:string = 'bar';
public barChartLegend3:boolean = true;

public barChartData3:any[] = [
  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
];

}
