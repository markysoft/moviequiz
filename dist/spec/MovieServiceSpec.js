"use strict";
var MovieService_1 = require('./../services/MovieService');
var service = new MovieService_1.MovieService();
describe("list movies", function () {
    it("should return the top 250 films", function () {
        var count = service.getCount();
        expect(count).toBe(250);
    });
    it("should return 3 unique randomly chosen movies", function () {
        var movies = service.GetRandomMovies(3);
        expect(movies).toBeDefined();
        expect(movies.length).toBe(3);
        expect(movies[0].id).not.toEqual(movies[1].id);
        expect(movies[1].id).not.toEqual(movies[2].id);
        expect(movies[2].id).not.toEqual(movies[0].id);
    });
});
//# sourceMappingURL=MovieServiceSpec.js.map