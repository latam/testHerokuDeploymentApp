import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {DatePipe} from '@angular/common';

import { AppComponent } from './app.component';
import {RegistrationComponent} from "./account/registration/registration.component";
import {LoginComponent} from "./account/login/login.component";
import {HomeComponent} from "./home/home.component";
import {CompanyComponent} from "./account/company/company.component";
import {OperationsComponent} from "./operations/operations.component";
import {OperationModalComponent} from "./operations/operation.modal.component";
import {VatRegistryComponent} from "./vatregistry/vatregistry.component";
import {KpirRegistryComponent} from "./kpirregistry/kpirregistry.component";
import {CompanyModalComponent} from "./account/company/company.modal.component";

import {DateFilterComponent} from "./common/filter/date.filter.component";

import {AuthenticationService} from "./service/authentication.service";
import {CompanyService} from "./service/company.service";
import {OperationsService} from "./service/operations.service";
import {VatRegistryService} from "./service/vatregistry.service";
import {KpirRegistryService} from "./service/kpirregistry.service";

import {CanActivateAuthGuard} from "./account/login/authguard";
import {PeriodFilterComponent} from "./common/filter/period.filter.component";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [CanActivateAuthGuard]
  },
  {
    path: 'operations',
    component: OperationsComponent,
    canActivate: [CanActivateAuthGuard]
  },
  {
    path: 'vat-registry',
    component: VatRegistryComponent,
    canActivate: [CanActivateAuthGuard]
  },
  {
    path: 'kpir-registry',
    component: KpirRegistryComponent,
    canActivate: [CanActivateAuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    CompanyComponent,
    CompanyModalComponent,
    OperationsComponent,
    OperationModalComponent,
    VatRegistryComponent,
    KpirRegistryComponent,
    DateFilterComponent,
    PeriodFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    CompanyService,
    OperationsService,
    VatRegistryService,
    KpirRegistryService,
    CanActivateAuthGuard,
    DatePipe
  ],
  entryComponents: [
    OperationModalComponent,
    CompanyModalComponent,
    DateFilterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
