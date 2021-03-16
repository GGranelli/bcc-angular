import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (this.authService.currentUser && request.body) {
    //   let updateObject = request.body;
    //   updateObject.utente = this.authService.currentUser.sub;
    // }

    // aggiungo jwt token ad ogni richiesta per controllare a back end se il token è valido. Se no il back end deve restituire 401 e l'interceptor per gli errori deve sbattere fuori in automatico l'utente.
    if (this.authService.token) {
    
      request = request.clone({
        setHeaders: {
          Authorization: `${this.authService.token}`
        }
      });
    }


    return next.handle(request);
  }
}
