import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class EditorAuthGuard implements CanActivate {
  
  constructor(private user: UserServiceService, private router: Router) { }

  canActivate(): boolean {
    if (this.user.editorLogin() || this.user.adminLogin()) {

      return true;

    } else {

      this.router.navigate(['home']);
      return false;

    }
  }
  
}
