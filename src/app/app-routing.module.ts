import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant/restaurant-list/restaurant-list.component';
import { RestaurantFormComponent } from './restaurant/restaurant-form/restaurant-form.component';

const routes: Routes = [
  { path: '', component: RestaurantListComponent},
  { path: 'restaurant-list', component: RestaurantListComponent},
  { path: 'add', component: RestaurantFormComponent},
  { path: 'edit/:id', component: RestaurantFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
