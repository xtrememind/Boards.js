import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import { SortByPipe } from './sort-by.pipe';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TestComponent,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
