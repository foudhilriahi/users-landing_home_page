import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { CandidateHomeComponent } from './candidate-home/candidate-home.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InfosPopupComponent } from './infos-popup/infos-popup.component';
import { CvPopupComponent } from './cv-popup/cv-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectCountryModule } from "@angular-material-extensions/select-country";
import { MatFormFieldModule } from '@angular/material/form-field';

import { NgxFileDropModule } from 'ngx-file-drop';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './profile/profile.component';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CompanyService } from './company.service';
import { MatMenuModule } from '@angular/material/menu';
import {MatDivider, MatDividerModule} from '@angular/material/divider';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';


















const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'company-home', component: CompanyHomeComponent },
  { path: 'candidate-home', component: CandidateHomeComponent },
  { path: 'profile', component: ProfileComponent }


];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CompanyHomeComponent,
    CandidateHomeComponent,
    InfosPopupComponent,
    CvPopupComponent,
    ProfileComponent,
   
    
   
    
    
  ],
  imports:[
    FormsModule,ReactiveFormsModule,MatDialogModule,MatListModule,FormsModule,MatExpansionModule,
    BrowserModule,MatMenuModule,MatDividerModule,
    BrowserAnimationsModule,NgxPaginationModule,MatIconModule,MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,NgxFileDropModule,MatPaginatorModule,
    RouterModule.forRoot(routes),
    HttpClientModule,MatButtonModule,MatNativeDateModule,
    MatCardModule,MatInputModule,MatDatepickerModule,
    MatSnackBarModule,MatDialogModule,MatSelectCountryModule.forRoot('de'),MatFormFieldModule,MatSelectModule
   
  ],
  providers: [RouterModule,CompanyService
  
  
  ], // Add RouterModule to the providers array
  bootstrap: [AppComponent]
})
export class AppModule { }