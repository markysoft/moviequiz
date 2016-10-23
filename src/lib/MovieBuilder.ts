import { MovieList } from './../domain/MovieList';
import { PageHelper, ElementWrapper } from './../services/moviescraper/PageHelper';
import { Movie } from './../domain/Movie';

import _ = require('underscore');

export class MovieBuilder {

    public static createMoviesList(html: string): MovieList {
        var movies = new MovieList();
        var page = new PageHelper(html);
        _.each(
            page.many(".titleColumn a"),
            link => {
                movies.push(MovieBuilder.create(link));
            }
        );
        return movies;
    }

    public static addDetails(movie: Movie, html: string): void {
        var page = new PageHelper(html);
        movie.summary = page.one(".summary_text").getContent();
        movie.poster = page.one(".poster a").getHref();
        movie.rating = Number(page.one(".ratingValue strong span").getContent());
        this.addGenres(movie, page);
        console.log(`movie: ${movie.title}`);
    }

    public static create(element: ElementWrapper) {
        return new Movie(
            element.getHref().split('/')[2],
            element.getContent()
        );
    }

    public static addKeywords(movie: Movie, html: string) {
        var page = new PageHelper(html);
        _.each(page.many(".sodatext a"), (link) => {
            movie.keywords.push(link.getContent());
        });
    }

    public static addGenres(movie: Movie, page: PageHelper) {
        _.each(page.many('div[itemprop="genre"] a'), (link) => {
            movie.genres.push(link.getContent());
        });
    }
}