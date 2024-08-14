import { Component, OnDestroy } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../model/restaurant.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnDestroy{
  restaurants: Restaurant[] = [];
  endsub$: Subject<any> = new Subject();
  searchRestaurants: string = '';
  showAlert = false
  alertMsg = 'Please wait!';
  alertColor = 'primary';
  constructor(private _restaurantsService :RestaurantService){
    this.fetchData();    
  }

  fetchData(){
    this._restaurantsService.getRestaurants().pipe(takeUntil(this.endsub$)).subscribe({
      next: (response:any) =>{        
          this.restaurants = response;
      },
      error: (err)=>{
        console.log(err)
        this.showAlert = true
        this.alertMsg = "An unexpected error occurred. Please try again later";
        this.alertColor = 'danger ';
      }
    })
  }
  filteredRestaurants(): any[] {
    if (!this.searchRestaurants) {
      return this.restaurants;
    }
    const searchTerm = this.searchRestaurants.toLowerCase();
    return this.restaurants.filter((restaurant:any) =>
      restaurant.name?.toLowerCase().includes(searchTerm) ||
      restaurant.location?.toLowerCase().includes(searchTerm) 
    );
  }
  // Delete restaurant
  deleteRestaurant(id:any, index: number){
    
    this._restaurantsService.deleteRestaurant(id).subscribe({
      next: (response: any) => {
        this.showAlert = true
        this.alertMsg = "Success! Selected restaurant has been deleted.";
        this.alertColor = "success ";
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
        this.fetchData();
      },
      error: (err)=>{
        this.showAlert = true
        this.alertMsg = "An unexpected error occurred. Please try again later";
        this.alertColor = 'danger ';
      }
    })
  }
  ngOnDestroy(): void {
    this.endsub$.next;
    this.endsub$.complete();
  }
}
