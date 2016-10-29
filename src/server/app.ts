///<reference path="../../typings/index.d.ts"/>
import { MovieService } from './../services/MovieService';

"use strict"
import express = require("express");
const PORT_NO: number = 5000;
const NO_OF_CHOICES: number = 3;
const movieService = new MovieService();

export class Server {
    private app: express.Application
    constructor() {
        this.app = express();
    }

    public setRoutes() {
        this.app.get('/', this.serveRoot);
        this.app.get('/question', this.question);
        this.app.use(express.static('public'));
    }

    public startServer() {
        this.app.listen(PORT_NO, function () {
            console.log('Example app listening on port 5000!');
        });
    }

    private question(req: express.Request, res: express.Response) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(movieService.createQuestion(NO_OF_CHOICES)));
    }

    private serveRoot(req: express.Request, res: express.Response) {
        res.send("yo!");
    }
}
