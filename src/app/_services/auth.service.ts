import {
  HttpClient,
  HttpResponse,
  HttpResponseBase,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url = environment.baseUrl;

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  get token() {
    return sessionStorage.getItem("token");
  }

  login(credentials) {
    let url = this.url + "/api/v1/login";
    return this.http
      .post(url, JSON.stringify(credentials), {
        headers: {
          "Content-type": "application/json",
        },
      })
      .pipe(
        map((result) => {
          let valid = false;

          if (result && result["accessToken"]) {
            valid = true;
            sessionStorage.setItem("token", result["accessToken"]);
          }

          return valid;
        })
      );
  }

  ping() {
    let url = this.url + "/api/v1/ping";
    return this.http.get(url, {
      headers: {
        "Content-type": "application/json",
      },
      responseType: "text" as "json",
    });
  }

  userPing() {
    let url = this.url + "/api/v1/userPing";
    return this.http.get(url, {
      headers: {
        "Content-type": "application/json",
      },
      responseType: "text" as "json",
    });
  }

  adminPing() {
    let url = this.url + "/api/v1/adminPing";
    return this.http.get(url, {
      headers: {
        "Content-type": "application/json",
      },
      responseType: "text" as "json",
    });
  }

  isLoggedIn() {
    if (this.token && this.jwtHelper.isTokenExpired(this.token)) {
      this.logout();
    }
    return !this.jwtHelper.isTokenExpired(this.token);
  }

  logout() {
    sessionStorage.removeItem("token");
    this.router.navigate(["/login"]);
    window.location.reload();
  }
}
