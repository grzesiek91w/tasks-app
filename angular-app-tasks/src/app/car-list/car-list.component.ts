import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})
export class CarListComponent {
  cars = this.carService.getCars();


  constructor(private carService: CarService, private router: Router) {}

  viewDetails(id: number) {

    this.router.navigate(['/car', id]); 

  }
}
