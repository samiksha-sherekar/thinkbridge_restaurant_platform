import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Restaurant } from '../model/restaurant.model';
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
 // Base URL for API endpoints 
  baseUrl = environment.baseurl;

  constructor(private http: HttpClient) {}

  // Get:Fetches the list of all restaurants from the server
  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}/restaurant`)
  }

  // POST: Submits new restaurant data to the server
  saveRestaurant(restaurantDetails:Restaurant): Observable<Restaurant>{
    return this.http.post<Restaurant>(`${this.baseUrl}/restaurant`, restaurantDetails)
  }

  // GET: Fetches a specific restaurant's details by its ID
  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/restaurant/${id}`);
  }

  // Update: Updates the details of an existing restaurant
  updateRestaurant(id: any, restaurantDetails:Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.baseUrl}/restaurant/${id}`, restaurantDetails);
  }

  // DELETE: Deletes a restaurant by its ID
  deleteRestaurant(id:string): Observable<Restaurant>{
    return this.http.delete<Restaurant>(`${this.baseUrl}/restaurant/${id}`)
  }
  
}
