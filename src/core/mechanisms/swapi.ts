import axios, { AxiosInstance } from 'axios';
import { IPeople } from '../models/people';

const getInstance = (): AxiosInstance => axios.create({
  baseURL: 'https://swapi.dev/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
  },
});

export default class SWApi {
  static async getPeople(page: number) {
    const { data } = await getInstance().get('/people', {
      params: {
        page,
      },
    });

    return {
      count: data.count,
      results: data.results.map((o: IPeople) => ({
        name: o.name,
        height: o.height,
        mass: o.mass,
        hair_color: o.hair_color,
        skin_color: o.skin_color,
        eye_color: o.eye_color,
        birth_year: o.birth_year,
        gender: o.gender,
      })),
    } as { count: number, results: IPeople[] };
  }
}
