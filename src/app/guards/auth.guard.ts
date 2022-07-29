import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private user: UserServiceService, private router: Router) { }

  canActivate(): boolean {
    if (this.user.editorLogin() || this.user.adminLogin() || this.user.authorLogin()) {

      return true;

    } else {

      this.router.navigate(['']);
      return false;

    }
  }

}
