import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantListComponent } from './restaurant/restaurant-list/restaurant-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantFormComponent } from './restaurant/restaurant-form/restaurant-form.component';
import { RestaurantService } from './services/restaurant.service';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    RestaurantFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
