import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../model/pokemon.model';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {

  pokemon: Pokemon | undefined;


  constructor(

    private route: ActivatedRoute,

    private pokemonService: PokemonService

  ) { }


  ngOnInit(): void {

    const name = this.route.snapshot.paramMap.get('name');

    console.log(name);

    if (name) {

      this.pokemonService.getPokemonDetails(name).subscribe(data => {

        this.pokemon = data;

        console.log(this.pokemon);

      });

    }

  }
}
