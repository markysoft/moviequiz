"use strict";
var NumberHelper_1 = require('./../lib/NumberHelper');
var QuestionBuilder_1 = require('./../lib/QuestionBuilder');
var _ = require('underscore');
var MovieService = (function () {
    function MovieService() {
        this.movies = require('../../moviesList.json');
    }
    MovieService.prototype.createQuestion = function (total) {
        var movies = this.GetRandomMovies(total);
        var helper = new QuestionBuilder_1.QuestionBuilder(movies);
        return helper.createQuestion();
    };
    MovieService.prototype.GetRandomMovies = function (total) {
        var _this = this;
        var selectedMovies = [];
        var indices = this.getRandomIndices(total);
        _.each(indices, function (index) {
            selectedMovies.push(_this.movies[index]);
        });
        return selectedMovies;
    };
    MovieService.prototype.getRandomIndices = function (total) {
        var indices = [];
        while (indices.length < total) {
            var index = NumberHelper_1.NumberHelper.Random(this.movies.length);
            if (indices.indexOf(index) < 0) {
                indices.push(index);
            }
        }
        return indices;
    };
    MovieService.prototype.getCount = function () {
        return this.movies.length;
    };
    return MovieService;
}());
exports.MovieService = MovieService;
//# sourceMappingURL=MovieService.js.map