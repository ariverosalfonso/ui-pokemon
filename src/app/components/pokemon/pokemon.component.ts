import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  @Input() pokemon;
  @Output() pokemonSelected = new EventEmitter();
  pokemonData;
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemon(this.pokemon.url).then((data: any) => {
      this.pokemonData = data;
    });
  }

  selectPokemon() {
    this.pokemonSelected.emit({
      pokemonData: this.pokemonData,
      pokemon: this.pokemon,
    });
  }
}
