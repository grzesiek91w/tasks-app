import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './add-car/add-car.component';
import { AverageAgeComponent } from './average-age/average-age.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarListComponent } from './car-list/car-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

const routes: Routes = [

  { path: 'add-car', component: AddCarComponent },

  {  path: 'list-car', component: CarListComponent },

  { path: 'car/:id', component: CarDetailComponent },

  { path: 'average-age', component: AverageAgeComponent },

  { path: 'list-pokemon', component: PokemonListComponent },

  { path: 'pokemon/:name', component: PokemonDetailComponent },

  { path: 'list-todo', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule) },

  { path: '**', redirectTo: 'list-car' } // Wildcard route

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
