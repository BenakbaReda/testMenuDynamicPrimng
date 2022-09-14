import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/Filter/categories/categories.component';
import { SidebarComponent } from './components/Filter/sidebar/sidebar.component';
import { PrimngModule } from './modules/primeng/primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/client/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    SidebarComponent,
    NavBarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    PrimngModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
