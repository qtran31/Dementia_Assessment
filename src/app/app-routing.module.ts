import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LaunchComponent} from "./components/launch/launch.component";
import {DementiaTestComponent} from "./components/dementia-test/dementia-test.component";
import { WelcomeComponent } from './welcome/welcome.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MenuComponent } from './menu/menu.component';
import { UserGeneralInformationComponent } from './user-general-information/user-general-information.component';
import { UserRiskComponent } from './user-risk/user-risk.component';
import { UserResultComponent } from './user-result/user-result.component';
import { ProviderViewComponent } from './provider-view/provider-view.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'launch', component: LaunchComponent},
  { path: 'dementia-test', component: DementiaTestComponent},
  { path: 'welcome', component: WelcomeComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'user-info', component: UserGeneralInformationComponent},
  { path: 'user-risk', component: UserRiskComponent},
  { path: 'user-result', component: UserResultComponent},
  { path: 'provider-view', component: ProviderViewComponent},
  { // This path MUST ALWAYS be the last path!!!
    // Do not add any paths below this point or they will not work and will be redirected to landing.
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
