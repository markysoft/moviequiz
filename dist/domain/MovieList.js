"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MovieList = (function (_super) {
    __extends(MovieList, _super);
    function MovieList() {
        _super.apply(this, arguments);
        this.currentIndex = 0;
    }
    MovieList.prototype.getNext = function () {
        this.currentIndex++;
        return this[this.currentIndex];
    };
    MovieList.prototype.getFirst = function () {
        return this[0];
    };
    MovieList.prototype.isLast = function (movie) {
        return this[this.length - 1] === movie;
    };
    return MovieList;
}(Array));
exports.MovieList = MovieList;
//# sourceMappingURL=MovieList.js.map