import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive,  Input} from '@angular/core';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { MiHttpService } from  '../../servicios/mi-http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertsService } from 'angular-alert-module';
import { NgxSpinnerService } from 'ngx-spinner';


/// <reference path="<relevant path>/node_modules/@types/googlemaps/index.d.ts" />
import {} from '@types/googlemaps';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild('search2') public search2Element: ElementRef;
  origen: string;
  destino: string;

  title1: string = 'Primer click: origen ';
  title2: string = 'Segundo click: destino';
  title3: string = 'O escriba la dereccion.';

  lat: number = -34.662773;
  lng: number = -58.364343;
  public zoom: number;
  markers: marker[] = []
  public latitude: number;
  public longitude: number;
  public origin: {}
  public destination: {}
  lugarElegido:any;

  constructor(private MihttpServ:MiHttpService,
    private alerts: AlertsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone
    ) { 
    this.origin = { lat: 0,lng: 0}
    this.destination = { lat:0,lng:0}
    this.zoom = 15;
    localStorage.setItem("OrigenViaje","");
    localStorage.setItem("DestinoViaje","");

  }
  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 2000);

    this.mapsAPILoader.load().then(
      () =>  {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place : google.maps.places.PlaceResult = autocomplete.getPlace();      
            if(place.geometry === undefined || place.geometry === null){            
              return;
            }
          });
        });
        return;
      }
    );
    this.mapsAPILoader.load().then(
      () =>  {
        let autocomplete = new google.maps.places.Autocomplete(this.search2Element.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place : google.maps.places.PlaceResult = autocomplete.getPlace();      
            
            console.log(place.formatted_address);
            
            if(place.geometry === undefined || place.geometry === null){
              
              return;
            }
          });
        });
        return;
      }
    );
  }



  getDirection() {
    this.origin = 
    { 
      lat: this.markers[0].lat,
       lng: this.markers[0].lng
    }
    this.destination = 
    { 
      lat: this.markers[1].lat,
       lng: this.markers[1].lng
    }
    this.Algo("OrigenViaje",this.markers[0].lat.toString(),this.markers[0].lng.toString());
    this.Algo("DestinoViaje",this.markers[1].lat.toString(),this.markers[1].lng.toString());
  }

  mapClicked($event: AGMMouseEvent) {

    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    }); 
    if(this.markers.length >= 2)
    {
      this.getDirection();
    }
  }

  Algo(OrigenODestino:string,lat:string, lng:string)
  {

    var key = "&key=AIzaSyB9B-SNSoatikFX-ueVC-K6Ac3q8XBg8QI";
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+'&alternatives=true'+key;
    console.log(url);
    this.MihttpServ.TraerLugar(url)
    .then(
      lugar => {this.lugarElegido = lugar
        
        console.log(this.lugarElegido.results[0].formatted_address);
        localStorage.setItem(OrigenODestino,this.lugarElegido.results[0].formatted_address);
        if("OrigenViaje" == OrigenODestino)
        {
          this.origen = this.lugarElegido.results[0].formatted_address;
        }
        else
        {
          this.destino = this.lugarElegido.results[0].formatted_address;
        }
        
      })
    .catch(e=>{
    this.alerts.setMessage('Fallo','error');

      });
  }

  Listo()
  {
    var ori= localStorage.getItem("OrigenViaje");
    var dest = localStorage.getItem("DestinoViaje");

    if(ori != "" && dest != "")
      {
        this.alerts.setMessage("Se guardo el origen y destino del viaje",'success');
        this.router.navigate(['/pedido']);
      }
      else
      {
        this.alerts.setMessage('No se guardo el origen y desrino del viaje','error')
        this.router.navigate(['/pedido']);
      }
  }

  Salir()
  {
    localStorage.setItem("OrigenViaje","");
    localStorage.setItem("DestinoViaje","");
   this.alerts.setMessage('No se guardo el origen y desrino del viaje','error')
    this.router.navigate(['/pedido']);
  }




  OrigenOut(any: any){

    this.origen;
    this.chequear();
  }
  
  DestinoOut(any: any){
    this.chequear();
  }
  
  chequear(){
    if(this.destino != '' && this.destino != undefined && this.origen != '' && this.origen != undefined)
      this.conDirec();
    return;
  }

  conDirec(){
    
    var key = "&key=AIzaSyB9B-SNSoatikFX-ueVC-K6Ac3q8XBg8QI";
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    var enviar = url+this.origen+key

    //SACO LAT Y LONG ORIGEN
    this.MihttpServ.TraerLugar(enviar)
    .then(
      lugar => {
        localStorage.setItem("OrigenViaje",lugar.results[0].formatted_address);
        this.origin = 
        { 
          lat: lugar.results[0].geometry.location.lat,
          lng: lugar.results[0].geometry.location.lng
        }

        this.MihttpServ.TraerLugar(url+this.destino+key)
        .then(
          data => {
            localStorage.setItem("DestinoViaje",data.results[0].formatted_address);
            this.destination = 
            { 
              lat: data.results[0].geometry.location.lat,
              lng: data.results[0].geometry.location.lng
            }
          })
        .catch(e=>{
          this.alerts.setMessage('Fallo','error'); 
        });


      })
    .catch(e=>{   
      this.alerts.setMessage('Fallo','error'); 
    });
  }

}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
