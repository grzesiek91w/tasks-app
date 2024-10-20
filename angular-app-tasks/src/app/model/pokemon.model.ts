export interface Ability {

    ability: {
  
      name: string;
  
      url: string;
  
    };
  
  }
  
  
  export interface Sprite {
  
    front_default: string;
  
  }
  
  
  export interface Pokemon {
  
    name: string;
  
    height: number;
  
    weight: number;
  
    abilities: Ability[];
  
    sprites: Sprite;
  
  }
  
  
  export interface PokemonListResponse {
  
    results: { name: string; url: string }[];
  
  }