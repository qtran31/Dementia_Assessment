import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LaunchComponent } from './components/launch/launch.component';
import { HeaderComponent } from './components/header/header.component';
import { DementiaTestComponent } from './components/dementia-test/dementia-test.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./providers/auth-interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import { WelcomeComponent } from './welcome/welcome.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MenuComponent } from './menu/menu.component';
import { UserGeneralInformationComponent } from './user-general-information/user-general-information.component';
import { UserRiskComponent } from './user-risk/user-risk.component';
import { UserResultComponent } from './user-result/user-result.component';
import { ProviderViewComponent } from './provider-view/provider-view.component';
import { SurveyModule } from "survey-angular-ui";

@NgModule({
  declarations: [
    AppComponent,
    LaunchComponent,
    HeaderComponent,
    DementiaTestComponent,
    WelcomeComponent,
    SignInComponent,
    SignUpComponent,
    MenuComponent,
    UserGeneralInformationComponent,
    UserRiskComponent,
    UserResultComponent,
    ProviderViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    SurveyModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [

    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
