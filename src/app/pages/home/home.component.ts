import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pokemons = [];
  pokemonsToFight = new Array(2);
  pokemonsToFightCard = new Array(2);
  counter = 0;
  winner = '';
  pokemon1 = '';
  pokemon2 = '';
  score1 = '';
  score2 = '';
  showTable = false;

  constructor(private pokeService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonsToFight[0] = { name: '' };
    this.pokemonsToFightCard[0] = {};
    this.pokemonsToFight[1] = { name: '' };
    this.pokemonsToFightCard[1] = {};
    this.pokeService.getPokemons().then((data: any) => {
      this.pokemons = data.results;
    });
    this.clear();
  }

  pokemonSelected(pokemon) {
    if (this.counter % 2 === 0) {
      this.pokemonsToFight[0] = pokemon.pokemonData;
      this.pokemonsToFightCard[0] = pokemon.pokemon;
      this.counter++;
    } else {
      this.pokemonsToFight[1] = pokemon.pokemonData;
      this.pokemonsToFightCard[1] = pokemon.pokemon;
      this.counter++;
    }

    console.log('Fight', this.pokemonsToFightCard);
  }
  clear() {
    this.showTable = false;
    this.pokemonsToFight[0] = { name: '' };
    this.pokemonsToFightCard[0] = {};
    this.pokemonsToFight[1] = { name: '' };
    this.pokemonsToFightCard[1] = {};
  }
  fight() {
    this.showTable = true;

    this.pokeService
      .postFight(this.pokemonsToFight[0], this.pokemonsToFight[1])
      .then((data: any) => {
        this.pokemon1 = data.pokemon1.name;
        this.pokemon2 = data.pokemon2.name;
        this.score1 = data.pokemon1.score;
        this.score2 = data.pokemon2.score;
        if (data.pokemon1.score > data.pokemon2.score) {
          this.winner = `El ganador es: ${data.pokemon1.name}`;
        } else if (data.pokemon1.score < data.pokemon2.score) {
          this.winner = `El ganador es: ${data.pokemon2.name}`;
        } else {
          this.winner = `Empate`;
        }
      });
  }
}
