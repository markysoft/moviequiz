import { Server } from './app';

var serverApp = new Server();
serverApp.setRoutes();
serverApp.startServer();