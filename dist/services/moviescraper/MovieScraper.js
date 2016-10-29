"use strict";
var MovieBuilder_1 = require('./../../lib/MovieBuilder');
var request = require('request');
var Rx = require('rxjs/Rx');
var fs = require('fs');
var MovieScraper = (function () {
    function MovieScraper() {
        this.TOP_250_PAGE = 'http://www.imdb.com/chart/top';
        this.moviesSubject = new Rx.Subject();
        this.completedSubject = new Rx.Subject();
        this.subscribeToMovieList();
        this.subscribeToMovieComplete();
    }
    MovieScraper.prototype.requestTop250 = function () {
        var _this = this;
        request(this.TOP_250_PAGE, function (error, response, html) {
            if (error) {
                _this.moviesSubject.error(error);
            }
            else {
                _this.movies = MovieBuilder_1.MovieBuilder.createMoviesList(html);
                _this.moviesSubject.next(_this.movies);
            }
        });
    };
    MovieScraper.prototype.subscribeToMovieList = function () {
        var _this = this;
        var subscr = this.moviesSubject.subscribe(function (movies) {
            _this.populateMovie(_this.movies.getFirst());
        }, function (error) {
            console.log("Could not load movies :" + error);
        });
    };
    MovieScraper.prototype.populateMovie = function (movie) {
        var _this = this;
        var url = "http://www.imdb.com/title/" + movie.id;
        request(url, function (error, response, html) {
            if (error) {
                _this.completedSubject.error(error);
            }
            else {
                MovieBuilder_1.MovieBuilder.addDetails(movie, html);
                _this.populateKeywords(movie);
                console.log("Done with: " + movie.title + " details");
            }
        });
    };
    MovieScraper.prototype.populateKeywords = function (movie) {
        var _this = this;
        var url = "http://www.imdb.com/title/" + movie.id + "/keywords";
        request(url, function (error, response, html) {
            if (error) {
                _this.completedSubject.error(error);
            }
            else {
                MovieBuilder_1.MovieBuilder.addKeywords(movie, html);
                console.log("Done with: " + movie.title + " keywords");
                if (_this.movies.isLast(movie)) {
                    _this.completedSubject.complete();
                }
                else {
                    _this.completedSubject.next(true);
                }
            }
        });
    };
    MovieScraper.prototype.subscribeToMovieComplete = function () {
        var _this = this;
        var subscr = this.completedSubject.subscribe(function (bool) {
            _this.populateMovie(_this.movies.getNext());
        }, function (err) {
            _this.populateMovie(_this.movies.getNext());
        }, function () {
            _this.saveToFile();
        });
    };
    MovieScraper.prototype.saveToFile = function () {
        fs.writeFile("./moviesList.json", "var movieList= " + JSON.stringify(this.movies) + ";", function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Movie list saved");
        });
    };
    return MovieScraper;
}());
exports.MovieScraper = MovieScraper;
//# sourceMappingURL=MovieScraper.js.map