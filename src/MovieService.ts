import { Movie } from "./Movie";
import { MovieList } from './MovieList';
import { NumberHelper } from './NumberHelper';
import _ = require('underscore');

export class MovieService {

    private movies: Movie[];

    constructor() {
        this.movies = require('../moviesList.json');
    }

    public GetRandomMovies(total: number): Movie[] {
        const selectedMovies: Movie[] = [];
        const indices = this.getRandomIndices(total);
        _.each(indices, (index) => {
            selectedMovies.push(this.movies[index]);
        })
        return selectedMovies;
    }    

    private getRandomIndices(total: number): number[] {
        const indices: number[] = [];
        while (indices.length < total) {
            let index = NumberHelper.Random(this.movies.length);
            if (indices.indexOf(index) < 0) {
                indices.push(index);
            }
        }
        return indices;
    }

    public getCount(): number {
        return this.movies.length;
    }
}