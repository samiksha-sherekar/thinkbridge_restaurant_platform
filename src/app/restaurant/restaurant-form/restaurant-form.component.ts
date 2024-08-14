import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/model/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent {
  restaurantForm!: FormGroup;
  isSubmitted: boolean = false;
  id!: string;
  title = "Restaurant";
  button = "+ Add";
  editMode: boolean = false;
  showAlert = false
  alertMsg = 'Please wait!';
  alertColor = 'primary';
  constructor(
              private _restaurantsService: RestaurantService,
              private route: ActivatedRoute,
              private router: Router,
  ){
    // Restaurant Form Initialization
    this.restaurantForm = new FormGroup({
      name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      description: new FormControl<string | null>(null, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]),
      location: new FormControl<string | null>(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      phone: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^\+?\d{1,15}$/)]),
      email: new FormControl<string | null>(null, [Validators.required,Validators.email]),
    });
    this.checkEdit();
  }

  // Check Edit Form
  checkEdit(){
    this.route.params.subscribe((params)=>{
      this.id = params['id'];
      if(this.id){
        this.editMode = true;
        this.title = 'Restaurant';
        this.button = "Update";
        this._restaurantsService.getRestaurantById(this.id).subscribe({
          next: (response:any)=>{
              const restaurantData = response;
              this.restaurantForm.patchValue(restaurantData);
          },
          error: (err:any)=>{
            console.log(err)
          }
        })
      }
    })
  }
  // Form Submit Start
  saveRestaurant(){
    this.isSubmitted = true;
    if (this.restaurantForm.invalid) {
      return;
    }
    this.showAlert = true
    this.alertMsg = 'Please wait!';
    this.alertColor = 'primary';

    const formData: any = this.restaurantForm.value;  
    
    if(this.editMode){
      this._restaurantsService.updateRestaurant(this.id,formData).subscribe({
        next: ()=>{
            this.isSubmitted = false;
            this.alertMsg = "Success! Selected restaurant has been updated.";
            this.alertColor = "success ";
            this.router.navigate(['./restaurant-list']);
        },
        error: ()=>{
          this.isSubmitted = false;
          this.alertMsg = "An unexpected error occurred. Please try again later";
          this.alertColor = 'danger ';
        }
      })
    }else{
      const obj = {...formData}
      this._restaurantsService.saveRestaurant(obj).subscribe({
        next: ()=>{
            this.isSubmitted = false;
            this.alertMsg = "Success! New restaurant has been added."
            this.alertColor = "success "
            this.router.navigate(['./restaurant-list']);
        },
        error: () => {
          this.isSubmitted = false;
          this.alertMsg = "An unexpected error occurred. Please try again later";
          this.alertColor = 'danger ';
        }
      })
    }
  }
}
