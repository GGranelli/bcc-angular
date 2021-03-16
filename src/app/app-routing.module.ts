import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "./_guards/auth-guard.service";

const routes: Routes = [
  { path: "", canActivate: [AuthGuardService],component:HomeComponent },
  { path: "home", canActivate: [AuthGuardService],component:HomeComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
