import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../service/car.service'; 

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss'
})
export class CarDetailComponent implements OnInit {

  car: any;

  serviceForm = new FormGroup({

    part: new FormControl(''),

    cost: new FormControl(''),

  });


  constructor(private route: ActivatedRoute, private carService: CarService) {}


  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id')!;

    this.car = this.carService.getCarById(id);

  }


  addService() {

    const newService = {

      part: this.serviceForm.get('part')?.value,

      cost: this.serviceForm.get('cost')?.value,

    };

    this.car.services.push(newService);

    this.carService.saveCars();

    this.serviceForm.reset();

  }

}
