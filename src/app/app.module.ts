import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpUrlGenerator } from '@ngrx/data';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RequisitionComponent } from './page/requisition/requisition.component';
import { EntityHttpUrlGenerator } from './entity-url-generator';

import { FundamentalStoreModule } from './fundamental-store.module';
import { storeConfig } from './fundamental-store.config';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RequisitionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    FundamentalStoreModule.forRoot(storeConfig),
    HttpClientModule
  ],
  providers: [
    { provide: HttpUrlGenerator, useClass: EntityHttpUrlGenerator },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
