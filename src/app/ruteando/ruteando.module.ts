import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InicioComponent} from '../componentes/inicio/inicio.component';
import {PrincipalComponent} from '../componentes/principal/principal.component';
import {EncuestaComponent} from '../componentes/encuesta/encuesta.component';
import {RegistrarComponent} from '../componentes/registrar/registrar.component';
import {ErrorComponent} from '../componentes/error/error.component';
import { RouterModule, Routes } from '@angular/router';
import {ClienteComponent} from '../componentes/cliente/cliente.component';
import {HabilitacionesComponent} from '../componentes/habilitaciones/habilitaciones.component';
import {AsignarViajesComponent} from '../componentes/asignar-viajes/asignar-viajes.component';
import {RemiseroViajesComponent} from '../componentes/remisero-viajes/remisero-viajes.component';
import {TodosLosViajesComponent} from '../componentes/todos-los-viajes/todos-los-viajes.component';
import {TodosLosViajesParaRemiseroComponent} from '../componentes/todos-los-viajes-para-remisero/todos-los-viajes-para-remisero.component';
import { VerificarJwtService } from '../servicios/auth/verificar-jwt.service';
import { AdminService } from '../servicios/auth/admin.service';
import { ClienteService } from '../servicios/auth/cliente.service';
import { RemiseroService } from '../servicios/auth/remisero.service';
import {AltasComponent} from '../componentes/altas/altas.component';
import {AsignarVehiculoComponent} from '../componentes/asignar-vehiculo/asignar-vehiculo.component';

const MiRuteo = [
  {path: 'inicio' , component: InicioComponent},
  {path: 'principal' , component: PrincipalComponent, canActivate: [VerificarJwtService]},
  {path: 'encuesta' , component: EncuestaComponent},
  {path: 'pedido' , component: ClienteComponent, canActivate: [ClienteService]},
  {path: 'registrar' , component: RegistrarComponent},
  {path: 'error' , component: ErrorComponent},
  {path: 'habilitaciones' , component: HabilitacionesComponent, canActivate: [AdminService]},
  {path: 'remiseroviajes' , component: RemiseroViajesComponent, canActivate: [RemiseroService]},
  {path: 'asignarViajes' , component: AsignarViajesComponent, canActivate: [AdminService]},
  {path: 'todos' , component: TodosLosViajesComponent, canActivate: [AdminService]},
  {path: 'altas' , component: AltasComponent, canActivate: [AdminService]},
  {path: 'todosMisViajes' , component: TodosLosViajesParaRemiseroComponent, canActivate: [RemiseroService]},
  {path: 'asignarVehiculo' , component: AsignarVehiculoComponent, canActivate: [AdminService]},
  {path: '' , component: InicioComponent},
  
  ]

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteandoModule { }
