import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel: Model<Pokemon>,
    private readonly axiosAdapter: AxiosAdapter,
  ) {}

  async executeSeed() {

    await this.PokemonModel.deleteMany({}); // Delete all documents

    const data = await this.axiosAdapter.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: {name: string, no: number}[] = [];

    data.results.forEach(({ name, url }) => {
      console.log(name, url);

      const segments = url.split('/');

      const no: number = +segments[segments.length - 2];

      // const pokemon = await this.PokemonModel.create({ no, name });

      pokemonToInsert.push({ name, no }); // [{name: 'bulbasaur', no: 1}, {name: 'ivysaur', no: 2}]

    });

      const insertManu = await this.PokemonModel.insertMany(pokemonToInsert);

      console.log(insertManu);

      // seria como un insert into pokemon (name, no) values ('bulbasaur', 1), ('ivysaur', 2) multiple insert
    return 'Seeded';
  }
}
