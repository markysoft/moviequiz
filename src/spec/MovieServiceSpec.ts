import { MovieService } from './../services/MovieService';
///<reference path="../../typings/index.d.ts"/>
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
});
