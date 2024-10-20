import { Component } from '@angular/core';
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.scss'
})
export class AddCarComponent {
  carName: string = '';
  carModel: string = '';


  constructor(private carService: CarService) {}


  addCar() {

    const newCar = { id: Date.now(), name: this.carName, model: this.carModel, services: [] };

    this.carService.addCar(newCar);

    this.carName = '';

    this.carModel = '';

  }
}
