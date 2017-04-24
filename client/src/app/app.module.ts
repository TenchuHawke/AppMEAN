import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './main/users/login/login.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from './main/users/registration/registration.component';
import { UsersComponent } from './main/users/users.component';
import { UserService } from './main/users/user.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UsersComponent,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
