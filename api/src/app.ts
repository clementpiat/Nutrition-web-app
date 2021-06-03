import express from 'express';
import bodyParser from 'body-parser';
import RouteInterface from './routeInterface'
import mongoose from 'mongoose';
import config from './config/config'

class App {
  public app: express.Application;
  public port: number;
 
  constructor(routes:Array<RouteInterface>, port:number) {
    this.app = express();
    this.port = port;
    
    mongoose.connect(config.connectionString);

    this.initializeMiddlewares();
    this.initializeControllers(routes);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());

    // Security options.
    this.app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      next();
    });
  }
 
  private initializeControllers(routes:Array<RouteInterface>) {
    routes.forEach((route) => {
      this.app.use('/', route.getRoute());
    });
  }
 
  public listen() { 
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;