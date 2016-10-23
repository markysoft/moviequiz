
import { Movie } from "./Movie";

export class MovieList extends Array<Movie>{
    private currentIndex: number = 0;

    public getNext(): Movie {
        this.currentIndex++;
        return this[this.currentIndex];
    }

    public getFirst() {
        return this[0];
    }

    public isLast(movie: Movie): Boolean {
        return this[this.length - 1] === movie;
    }
}