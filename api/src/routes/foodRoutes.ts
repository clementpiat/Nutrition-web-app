import foodController from '../controllers/foodController'
import Ciqual from '../services/Ciqual'
import core from "express-serve-static-core";
import { timingSafeEqual } from 'crypto';

class FoodRoutes {
    static pathFood = "/api/food"

    static initializeRoutes (router : core.Router) {
        router.get(this.pathFood + '',foodController.getFoods);
        router.get(this.pathFood + '/:date',foodController.getFoodsByDate);
        router.post(this.pathFood + '/add',foodController.addNewFood);
        router.get(this.pathFood + '/:foodId',foodController.getFoodWithID);
        router.put(this.pathFood + '/:foodId',foodController.updateFood); 
        router.delete(this.pathFood + '/:foodId',foodController.deleteFood);
        router.get(this.pathFood + '/ciqual/product/:product',Ciqual.getProducts);
        router.get(this.pathFood + '/ciqual/code/:code',Ciqual.getNutritients);
    }
}

export default FoodRoutes;