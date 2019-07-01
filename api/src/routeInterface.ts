import * as core from "express-serve-static-core";

interface RouteInterface {
  getRoute() : core.Router;
}

export default RouteInterface;