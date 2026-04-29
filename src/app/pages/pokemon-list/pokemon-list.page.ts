import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {
  pokemons: any[] = [];
  loading = false;

  // Para búsqueda individual
  searchName: string = '';
  pokemon: any = null;
  error: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.fetchPokemons();
  }

  fetchPokemons() {
    this.loading = true;
    this.pokemonService.getPokemons(50).subscribe({
      next: (response) => {
        this.pokemons = response.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon:', error);
        this.loading = false;
      },
    });
  }

  searchPokemon() {
    if (!this.searchName) {
      this.error = 'Por favor ingresa un nombre o ID';
      this.pokemon = null;
      return;
    }
    this.pokemonService.getPokemonDetails(this.searchName.toLowerCase().trim()).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.error = '';
      },
      error: () => {
        this.pokemon = null;
        this.error = 'Pokémon no encontrado';
      }
    });
  }

  // Métodos para mostrar tipos y habilidades en el HTML
  getPokemonTypes(pokemon: any): string {
    if (!pokemon || !pokemon.types) return '';
    return pokemon.types.map((t: any) => t.type.name).join(', ');
  }

  getPokemonAbilities(pokemon: any): string {
    if (!pokemon || !pokemon.abilities) return '';
    return pokemon.abilities.map((a: any) => a.ability.name).join(', ');
  }

  // Método para mostrar estadísticas
  getPokemonStats(pokemon: any): string {
    if (!pokemon || !pokemon.stats) return '';
    return pokemon.stats.map((s: any) => `${s.stat.name}: ${s.base_stat}`).join(', ');
  }

  // Método para mostrar nombre de especie
  getPokemonSpecies(pokemon: any): string {
    if (!pokemon || !pokemon.species) return '';
    return pokemon.species.name;
  }
}