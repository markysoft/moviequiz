"use strict";
var Movie = (function () {
    function Movie(id, title) {
        this.id = id;
        this.title = title;
        this.keywords = [];
        this.genres = [];
    }
    Movie.prototype.getKeywords = function () {
        return this.keywords;
    };
    return Movie;
}());
exports.Movie = Movie;
//# sourceMappingURL=Movie.js.map