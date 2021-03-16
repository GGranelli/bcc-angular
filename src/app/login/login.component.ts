import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router,
    private route: ActivatedRoute,) {}

  credentials: {
    password;
    username;
  };

  ngOnInit() {
    this.credentials = { password: "", username: "" };
  }

  login() {
    this.authService.login(this.credentials).subscribe((valid) => {
      if (valid) {
        let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
        this.router.navigate([returnUrl || "/home"]);
      }
    });
  }
}
