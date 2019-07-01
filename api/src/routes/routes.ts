import RouteInterface from "../routeInterface";
import express from 'express';
import core from "express-serve-static-core";

import FoodRoutes from "./foodRoutes";

export default class Routes implements RouteInterface {
    private path = "/api"
    private router = express.Router()

    constructor(){
        FoodRoutes.initializeRoutes(this.router)
    }

    getRoute(): core.Router {
        return this.router
      }
}