import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {HttpModule, ConnectionBackend} from '@angular/http';
import { AppComponent } from './app.component';
import { GalleriaModule } from 'primeng/galleria';


import { RuteandoModule } from './ruteando/ruteando.module';

import { MiHttpService } from  './servicios/mi-http.service';
import { PersonaService } from  './servicios/persona.service';
import { ViajesService } from  './servicios/viajes.service';
import { RemiseroService } from  './servicios/remisero.service';
import { VehiculoService } from  './servicios/vehiculo.service';
import { ArchivoPersonaService } from  './servicios/archivo-persona.service';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { ErrorComponent } from './componentes/error/error.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { CarrouselComponent } from './componentes/carrousel/carrousel.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { HabilitacionesComponent } from './componentes/habilitaciones/habilitaciones.component';
import { AsignarViajesComponent } from './componentes/asignar-viajes/asignar-viajes.component';
import { RemiseroViajesComponent } from './componentes/remisero-viajes/remisero-viajes.component';
import { TodosLosViajesComponent } from './componentes/todos-los-viajes/todos-los-viajes.component';
import { AltasComponent } from './componentes/altas/altas.component';
import { AsignarVehiculoComponent } from './componentes/asignar-vehiculo/asignar-vehiculo.component';
import { TodosLosViajesParaRemiseroComponent } from './componentes/todos-los-viajes-para-remisero/todos-los-viajes-para-remisero.component';


import { RecaptchaModule } from 'ng-recaptcha';
import { CaptchaComponent } from './componentes/captcha/captcha.component';
import { MapaComponent } from './componentes/mapa/mapa.component';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component'


import { ChartsModule } from 'ng2-charts';

import { AlertsModule } from 'angular-alert-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EstadoDirective } from './Directivas/estado.directive';
import { PrecioPipe } from './pipes/precio.pipe';

//import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PrincipalComponent,
    EncuestaComponent,
    RegistrarComponent,
    ErrorComponent,
    CabeceraComponent,
    FooterComponent,
    CarrouselComponent,
    ClienteComponent,
    HabilitacionesComponent,
    AsignarViajesComponent,
    RemiseroViajesComponent,
    TodosLosViajesComponent,
    AltasComponent,
    AsignarVehiculoComponent,
    TodosLosViajesParaRemiseroComponent,
    CaptchaComponent,
    MapaComponent,
    EstadisticasComponent,
    EstadoDirective,
    PrecioPipe
    //FileSelectDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RuteandoModule,
    RecaptchaModule.forRoot(),
    FormsModule,
    GalleriaModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB9B-SNSoatikFX-ueVC-K6Ac3q8XBg8QI',
      libraries : ['places']
    }),
    ChartsModule,
    NgbModule.forRoot(),
    AlertsModule.forRoot(),
    NgxSpinnerModule
  
  ],
  providers: [
    MiHttpService,
    PersonaService,
    ViajesService,
    RemiseroService,
    VehiculoService,
    ArchivoPersonaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
