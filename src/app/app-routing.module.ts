import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LangComponent } from './components/lang/lang.component';
import { HomeComponent } from './components/home/home.component';
import { P403Component } from './components/p403/p403.component';
import { P404Component } from './components/p404/p404.component';
import { GuardNoAuthService } from './services/guard-no-auth.service';


const routes: Routes = [
  { path: 'signup', component: SignupComponent , canActivate : [GuardNoAuthService] },  
  { path: 'lang', component: LangComponent },
  { path: '403', component: P403Component },
  { path: '404', component: P404Component },  
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
