"use strict";
///<reference path="../../typings/index.d.ts"/>
var MovieService_1 = require('./../services/MovieService');
"use strict";
var express = require("express");
var PORT_NO = 5000;
var NO_OF_CHOICES = 3;
var movieService = new MovieService_1.MovieService();
var Server = (function () {
    function Server() {
        this.app = express();
    }
    Server.prototype.setRoutes = function () {
        this.app.get('/', this.serveRoot);
        this.app.get('/question', this.question);
        this.app.use(express.static('public'));
    };
    Server.prototype.startServer = function () {
        this.app.listen(PORT_NO, function () {
            console.log('Example app listening on port 5000!');
        });
    };
    Server.prototype.question = function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(movieService.createQuestion(NO_OF_CHOICES)));
    };
    Server.prototype.serveRoot = function (req, res) {
        res.send("yo!");
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=app.js.map