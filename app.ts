import {MovieScraper} from "./src/MovieScraper";
import {Movie} from "./src/Movie";

var scraper = new MovieScraper();
scraper.requestTop250();
