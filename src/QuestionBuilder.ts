import { Movie } from './Movie';
import { NumberHelper } from './NumberHelper';
import { MovieScraper } from './MovieScraper';
import _ = require('underscore');

export class Question{
    public answer: number;
    constructor(public movies: Movie[], public movie: Movie, public keyword: string){
        this.answer = movies.indexOf(movie);
    }
}

export class QuestionBuilder {
    private duplicates: string[];
    constructor(private movies: Movie[]) {
    }

    public createQuestion() : Question {
      this.buildListOfDuplicateKeywords();
      const movie = this.selectRandomMovie();
      const keyword = this.selectUniqueRandomKeyword(movie);
      return  new Question(this.movies, movie, keyword);
    }

    private selectRandomMovie(): Movie{
        let index = NumberHelper.Random(this.movies.length);
        return this.movies[index];
    }

    private selectUniqueRandomKeyword(movie: Movie): string{
        let keyword = undefined;
         while (keyword === undefined) {
            let index = NumberHelper.Random(movie.keywords.length);
            if (_.contains(this.duplicates, movie.keywords[index]) == false) {
                keyword = movie.keywords[index];
            }
        }
        return keyword;
    }
 
    private buildListOfDuplicateKeywords(){        
        this.duplicates = [];
          _.each(this.movies, movie => {
            this.getDuplicates(movie);
        });
    }

    private getDuplicates( movieToCheck: Movie) {
        _.each(this.movies, movie => {
            if (movie != movieToCheck) {
                this.getDuplicateKeywords(movieToCheck, movie);
            }
        });
    }

    private getDuplicateKeywords(movie: Movie, movieToCheck: Movie) {
        _.each(movie.keywords, keyword => {
            if (_.contains(movieToCheck.keywords, keyword)) {
                if (_.contains(this.duplicates, keyword) == false) {
                    this.duplicates.push(keyword);
                }
            }
        });
    }
}