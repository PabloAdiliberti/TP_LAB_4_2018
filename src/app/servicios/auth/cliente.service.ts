import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router }  from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService implements CanActivate {

  constructor( private router: Router, private auth: AuthService ) {
    console.log('isLogued()', auth.isLogued());
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

    if ( this.auth.isLogued() && localStorage.getItem('tipo') == 'cliente'  )
    {
      return true;
    }
    else
    {
      this.router.navigate(['/error']);
      return false;
    }
  }

}
