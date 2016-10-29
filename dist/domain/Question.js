"use strict";
var Question = (function () {
    function Question(movies, movie, keyword) {
        this.movies = movies;
        this.movie = movie;
        this.keyword = keyword;
        this.answer = movies.indexOf(movie);
    }
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=Question.js.map