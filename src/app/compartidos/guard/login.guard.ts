import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private auth: AuthServiceService)
  {}

  canActivate(): Promise <boolean> | boolean
  {
   /* return this.auth.usuarioLoggeado().then( r => {
      console.log(r);
      return r;
    });*/
     return true;

  }



}
