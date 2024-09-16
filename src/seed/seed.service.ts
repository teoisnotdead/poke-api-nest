import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {

    await this.PokemonModel.deleteMany({}); // Delete all documents

    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    const inserPromisesArray = [];

    data.results.forEach(({ name, url }) => {
      console.log(name, url);

      const segments = url.split('/');

      const no: number = +segments[segments.length - 2];

      // const pokemon = await this.PokemonModel.create({ no, name });

      const newArr = inserPromisesArray.push(this.PokemonModel.create({ no, name }));
      console.log(newArr);

    });

    await Promise.all(inserPromisesArray);

    return 'Seeded';
  }
}
