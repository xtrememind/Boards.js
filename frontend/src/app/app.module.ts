import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import { SortByPipe } from './sort-by.pipe';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {UserService} from './services/user.service'

import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TestComponent,
    SortByPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
   /// HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
