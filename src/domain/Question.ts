import { Movie } from './Movie';

export class Question{
    public answer: number;
    constructor(public movies: Movie[], public movie: Movie, public keyword: string){
        this.answer = movies.indexOf(movie);
    }
}
