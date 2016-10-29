"use strict";
var Question_1 = require('./../domain/Question');
var NumberHelper_1 = require('./NumberHelper');
var _ = require('underscore');
var QuestionBuilder = (function () {
    function QuestionBuilder(movies) {
        this.movies = movies;
    }
    QuestionBuilder.prototype.createQuestion = function () {
        this.buildListOfDuplicateKeywords();
        var movie = this.selectRandomMovie();
        var keyword = this.selectUniqueRandomKeyword(movie);
        return new Question_1.Question(this.movies, movie, keyword);
    };
    QuestionBuilder.prototype.selectRandomMovie = function () {
        var index = NumberHelper_1.NumberHelper.Random(this.movies.length);
        return this.movies[index];
    };
    QuestionBuilder.prototype.selectUniqueRandomKeyword = function (movie) {
        var keyword = undefined;
        while (keyword === undefined) {
            var index = NumberHelper_1.NumberHelper.Random(movie.keywords.length);
            if (_.contains(this.duplicates, movie.keywords[index]) == false) {
                keyword = movie.keywords[index];
            }
        }
        return keyword;
    };
    QuestionBuilder.prototype.buildListOfDuplicateKeywords = function () {
        var _this = this;
        this.duplicates = [];
        _.each(this.movies, function (movie) {
            _this.getDuplicates(movie);
        });
    };
    QuestionBuilder.prototype.getDuplicates = function (movieToCheck) {
        var _this = this;
        _.each(this.movies, function (movie) {
            if (movie != movieToCheck) {
                _this.getDuplicateKeywords(movieToCheck, movie);
            }
        });
    };
    QuestionBuilder.prototype.getDuplicateKeywords = function (movie, movieToCheck) {
        var _this = this;
        _.each(movie.keywords, function (keyword) {
            if (_.contains(movieToCheck.keywords, keyword)) {
                if (_.contains(_this.duplicates, keyword) == false) {
                    _this.duplicates.push(keyword);
                }
            }
        });
    };
    return QuestionBuilder;
}());
exports.QuestionBuilder = QuestionBuilder;
//# sourceMappingURL=QuestionBuilder.js.map