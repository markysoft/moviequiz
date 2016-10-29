"use strict";
var MovieList_1 = require('./../domain/MovieList');
var PageHelper_1 = require('./../services/moviescraper/PageHelper');
var Movie_1 = require('./../domain/Movie');
var _ = require('underscore');
var MovieBuilder = (function () {
    function MovieBuilder() {
    }
    MovieBuilder.createMoviesList = function (html) {
        var movies = new MovieList_1.MovieList();
        var page = new PageHelper_1.PageHelper(html);
        _.each(page.many(".titleColumn a"), function (link) {
            movies.push(MovieBuilder.create(link));
        });
        return movies;
    };
    MovieBuilder.addDetails = function (movie, html) {
        var page = new PageHelper_1.PageHelper(html);
        movie.summary = page.one(".summary_text").getContent();
        movie.poster = page.one(".poster a").getHref();
        movie.rating = Number(page.one(".ratingValue strong span").getContent());
        this.addGenres(movie, page);
        console.log("movie: " + movie.title);
    };
    MovieBuilder.create = function (element) {
        return new Movie_1.Movie(element.getHref().split('/')[2], element.getContent());
    };
    MovieBuilder.addKeywords = function (movie, html) {
        var page = new PageHelper_1.PageHelper(html);
        _.each(page.many(".sodatext a"), function (link) {
            movie.keywords.push(link.getContent());
        });
    };
    MovieBuilder.addGenres = function (movie, page) {
        _.each(page.many('div[itemprop="genre"] a'), function (link) {
            movie.genres.push(link.getContent());
        });
    };
    return MovieBuilder;
}());
exports.MovieBuilder = MovieBuilder;
//# sourceMappingURL=MovieBuilder.js.map