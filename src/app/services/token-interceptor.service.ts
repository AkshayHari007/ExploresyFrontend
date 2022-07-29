import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { Injector } from '@angular/core';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: any, nxt: any) {
    let userSevice = this.injector.get(UserServiceService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userSevice.getToken()}`,
      },
    });
    return nxt.handle(tokenizedReq);
  }
}
