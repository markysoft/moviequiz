import { MovieScraper } from './src/services/moviescraper/MovieScraper';
var scraper = new MovieScraper();
scraper.requestTop250();
