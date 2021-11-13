import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable() 
export class PokemonService {

    constructor(private http: HttpClient) {

    }

    getPokemons(){
        return this.http.get(`${BASE_URL}`);
    }

    getPokemon(url){
        return this.http.get(url);
    }
    
    postFight(pokemon1, pokemon2) {

        const data = {
            firstPokemon: {
                id: pokemon1.id,
                name: pokemon1.name,
                types: pokemon1.types
            },
            secondPokemon: {
                id: pokemon2.id,
                name: pokemon2.name,
                types: pokemon2.types
            },
        }
        
        return this.http.post(`${BASE_URL}fight`, data);
    }
}