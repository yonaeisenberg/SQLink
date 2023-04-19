import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { DetailsComponent } from './info/details/details.component';
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { ProjectsTableComponent } from './info/projects-table/projects-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiService } from './services/api-service.service';
import { ContactInfoService } from './services/contact-info.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InfoComponent,
    DetailsComponent,
    ProjectsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    //MatPaginatorModule,
    MatSortModule,
    //MatProgressSpinnerModule
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    ContactInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
