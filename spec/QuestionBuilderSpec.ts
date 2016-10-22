///<reference path="../typings/index.d.ts"/>
import { MovieService } from '../src/MovieService';
import { Movie } from './../src/Movie';
import { QuestionBuilder } from './../src/QuestionBuilder';
import Jasmine = require('jasmine');
import _ = require('underscore');
const service = new MovieService();


describe("Choose movie and keyword", () => {

    it("should return a movie and a chosen keyword", () => {
        var movies = service.GetRandomMovies(3);
        const helper = new QuestionBuilder(movies);
        var question = helper.createQuestion();
        expect(question).toBeDefined();
        expect(question.keyword).toBeDefined();
        expect(question.answer).toBeDefined();
        let matches = 0;
        _.each(movies, m => {
            if (_.contains(m.keywords, question.keyword)) {
                matches++;
            }
        });

        expect(matches).toBe(1);

    })
});
