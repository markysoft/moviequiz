///<reference path="../../../typings/index.d.ts"/>
import { Movie } from './../../domain/Movie';
import { MovieList } from './../../domain/MovieList';
import { MovieBuilder } from './../../lib/MovieBuilder';
import request = require('request');
import Rx = require('rxjs/Rx');
import _ = require('underscore');
import fs = require('fs');
import Promise = require('es6-promise');

export class MovieScraper {

    private TOP_250_PAGE = 'http://www.imdb.com/chart/top';
    private moviesSubject: Rx.Subject<Movie[]>;
    private completedSubject: Rx.Subject<Boolean>;
    private movies: MovieList;
    private currentIndex: number;

    constructor() {
        this.moviesSubject = new Rx.Subject<Movie[]>();
        this.completedSubject = new Rx.Subject<Boolean>();
        this.subscribeToMovieList();
        this.subscribeToMovieComplete();
    }

    public requestTop250(): void {
        request(this.TOP_250_PAGE, (error, response, html) => {
            if (error) {
                this.moviesSubject.error(error);
            }
            else {
                this.movies = MovieBuilder.createMoviesList(html);
                this.moviesSubject.next(this.movies);
            }
        })
    }

    private subscribeToMovieList() {
        var subscr = this.moviesSubject.subscribe(
            (movies: Movie[]) => {
                this.populateMovie(this.movies.getFirst());
            },
            (error: any) => {
                console.log("Could not load movies :" + error);
            }
        );
    }

    public populateMovie(movie: Movie) {
        var url = `http://www.imdb.com/title/${movie.id}`;
        request(url, (error, response, html) => {
            if (error) {
                this.completedSubject.error(error);
            } else {
                MovieBuilder.addDetails(movie, html);
                this.populateKeywords(movie);
                console.log(`Done with: ${movie.title} details`);
            }
        });
    }

    public populateKeywords(movie: Movie) {
        var url = `http://www.imdb.com/title/${movie.id}/keywords`;
        request(url, (error, response, html) => {
            if (error) {
                this.completedSubject.error(error);
            } else {
                MovieBuilder.addKeywords(movie, html);
                console.log(`Done with: ${movie.title} keywords`);

                if (this.movies.isLast(movie)) {
                    this.completedSubject.complete();
                }
                else {
                    this.completedSubject.next(true);
                }
            }
        });
    }

    private subscribeToMovieComplete() {
        var subscr = this.completedSubject.subscribe(
            (bool) => {
                this.populateMovie(this.movies.getNext());
            },
            (err) => {
                this.populateMovie(this.movies.getNext());
            },
            () => {
                this.saveToFile();
            }            
        );
    }

    private saveToFile() : void {
        fs.writeFile("./moviesList.json", `var movieList= ${JSON.stringify(this.movies)};`, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Movie list saved");
        });
    }

}