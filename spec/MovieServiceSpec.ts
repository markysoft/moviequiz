///<reference path="../typings/index.d.ts"/>
import { MovieService } from '../src/MovieService';
import { Movie } from './../src/Movie';
import { QuestionBuilder } from '../src/QuestionBuilder';
import Jasmine = require('jasmine');
const service = new MovieService();

describe("list movies", () => {
    it("should return the top 250 films", () => {       
        var count = service.getCount();
        expect(count).toBe(250);
    })

    it("should return 3 unique randomly chosen movies", () =>  {
        var movies = service.GetRandomMovies(3);
        expect(movies).toBeDefined();
        expect(movies.length).toBe(3);
        expect(movies[0].id).not.toEqual(movies[1].id);
        expect(movies[1].id).not.toEqual(movies[2].id);
        expect(movies[2].id).not.toEqual(movies[0].id);
    })

    it("should return 3 unique randomly chosen movies", () =>  {
        var movies = service.GetRandomMovies(3);
        const helper = new QuestionBuilder(movies);
        var answer = helper.createQuestion();
        expect(answer).toBeDefined();
        expect(answer.keyword).toBeDefined();
        console.log(answer.movie.title, answer.keyword);
    })
});
