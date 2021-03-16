import {
  HttpClient,
  HttpParams,
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
export class CustomerService {
  url = environment.baseUrl;

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  getCustomers(branch, nag, customerName, birthDate) {
    let url =
      this.url +
      "/api/v1/customer-search" +
      "?branch=" +
      branch +
      "&nag=" +
      nag;

    if (customerName !== "") {
      url += "&customerName=" + customerName;
      if (birthDate !== "") {
        url += "&birthDate=" + birthDate;
      }
    }

    return this.http.get(url, {
      headers: {
        "Content-type": "application/json",
      },
    });
  }
}
