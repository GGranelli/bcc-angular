import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthGuardService } from "./_guards/auth-guard.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { JwtInterceptor } from "./_interceptors/jwt.interceptor";
import { NavbarComponent } from "./navbar/navbar.component";
import { CustomerSearchComponent } from "./customer-search/customer-search.component";
import { CustomerTableComponent } from "./customer-table/customer-table.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ModalComponent } from "./modal/modal.component";
import { TableModalComponent } from "./table-modal/table-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CustomerSearchComponent,
    CustomerTableComponent,
    ModalComponent,
    TableModalComponent,
  ],
  entryComponents: [ModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    NgbActiveModal,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
