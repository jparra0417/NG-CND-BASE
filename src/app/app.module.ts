import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { LangPipe } from './pipes/lang.pipe';
import { LangComponent } from './components/lang/lang.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { InterceptorService } from './services/interceptor.service';
import { P403Component } from './components/p403/p403.component';
import { P404Component } from './components/p404/p404.component';
import { MessageComponent } from './components/message/message.component';
import { SpinerComponent } from './components/spiner/spiner.component';
import { PasswordComponent } from './components/password/password.component';
import { ResetComponent } from './components/reset/reset.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    LangPipe,
    LangComponent,
    HomeComponent,
    MenuComponent,
    P403Component,
    P404Component,
    MessageComponent,
    SpinerComponent,
    PasswordComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
