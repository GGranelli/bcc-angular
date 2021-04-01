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

  getCustomers(
    branch: number,
    nag: string,
    customerName: string,
    birthDate: string
  ) {
    let url =
      this.url +
      "/api/v1/customer-search" +
      "?branch=" +
      branch +
      "&nag=" +
      nag;

    if (customerName !== "") {
      url += "&customerName=" + customerName;
      if (
        birthDate !== "" &&
        birthDate !== "undefined" &&
        birthDate.length === 10
      ) {
        url += "&birthDate=" + birthDate;
      }
    }

    return this.http.get(url, {
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  customerMarkAsEdited(items) {
    let url = this.url + "/api/v1/customer-mark-as-edited";
    const data = {};
    items.map((item) => (data[item.path] = item.flagged));

    return this.http.post(url, data, {
      headers: {
        "Content-type": "application/json",
      },
      responseType: "text",
    });
  }
}
