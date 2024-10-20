import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../model/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';


  constructor(private http: HttpClient) { }

  getAllPokemons(limit: number = 1000, offset: number = 0): Observable<PokemonListResponse> {

    return this.http.get<PokemonListResponse>(`${this.apiUrl}?limit=${limit}&offset=${offset}`).pipe(

      catchError((error: HttpErrorResponse) => {

        console.error('Error occurred:', error);

        return throwError(() => error);

      })

    );

  }


  getPokemonDetails(name: string): Observable<Pokemon> {

    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);

  }

}
