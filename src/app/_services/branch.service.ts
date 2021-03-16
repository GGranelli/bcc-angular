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
export class BranchService {
  url = environment.baseUrl;

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  getBranches() {
    let url = this.url + "/api/v1/branch-search";

    return this.http.get(url, {
      headers: {
        "Content-type": "application/json",
      },
    });
  }
}
