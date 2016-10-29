"use strict";
///<reference path="../../typings/index.d.ts"/>
var MovieService_1 = require('./../services/MovieService');
var QuestionBuilder_1 = require('./../lib/QuestionBuilder');
var _ = require('underscore');
var service = new MovieService_1.MovieService();
describe("Choose movie and keyword", function () {
    it("should return a movie and a chosen keyword", function () {
        var movies = service.GetRandomMovies(3);
        var helper = new QuestionBuilder_1.QuestionBuilder(movies);
        var question = helper.createQuestion();
        expect(question).toBeDefined();
        expect(question.keyword).toBeDefined();
        expect(question.answer).toBeDefined();
        var matches = 0;
        _.each(movies, function (m) {
            if (_.contains(m.keywords, question.keyword)) {
                matches++;
            }
        });
        expect(matches).toBe(1);
    });
});
//# sourceMappingURL=QuestionBuilderSpec.js.map