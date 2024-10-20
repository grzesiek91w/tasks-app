import { Component, OnInit } from '@angular/core';
import { UsingJoinColumnOnlyOnOneSideAllowedError } from 'typeorm';
import { PokemonListResponse } from '../model/pokemon.model';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {

  pokemons: { name: string; url: string }[] = [];


  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void {

    this.pokemonService.getAllPokemons().subscribe((data: PokemonListResponse) => {

      this.pokemons = data.results;
      console.log(this.pokemons);
    });

  }
}
