import { Injectable } from '@angular/core';

interface Car {

  id: number;

  name: string;

  model: string;

  services: { part: string; cost: number }[];

}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private cars: Car[] = [];


  constructor() {

    this.loadCars();

  }


  private loadCars() {

    const storedCars = localStorage.getItem('cars');

    this.cars = storedCars ? JSON.parse(storedCars) : [];

  }


  saveCars() {

    localStorage.setItem('cars', JSON.stringify(this.cars));

  }


  addCar(car: Car) {

    this.cars.push(car);

    this.saveCars();

  }


  getCars(): Car[] {

    return this.cars;

  }


  getCarById(id: number): Car | undefined {

    return this.cars.find(car => car.id === id);

  }

}
