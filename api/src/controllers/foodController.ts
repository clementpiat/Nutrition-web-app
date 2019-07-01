import * as mongoose from 'mongoose';
import { FoodSchema } from '../schemas/FoodSchema';
import { Request, Response, response } from 'express';


const Food = mongoose.model('Node', FoodSchema);
class FoodController{

addNewFood (req: Request, res: Response) {                
    let newFood = new Food (req.body);

    newFood.save((err, food) => {
        if(err){
            res.send(err);
        }    
        res.json(food);
    });
    }

getFoods (req: Request, res: Response) {           
    Food.find({}, (err, food) => {
        if(err){
            res.send(err);
        }
        res.json(food);
    });
}

getFoodsByDate (req: Request, res: Response) {
    var dateList =  req.params.date.split('-').map((str : string) => parseInt(str,10));
    var year = dateList[0];
    var month = dateList[1];
    var day = dateList[2];

    var date = new Date(year,month-1,day);
    date.setHours(1)
    var nextDate = new Date(year,month-1,day);
    nextDate.setHours(23)
    //nextDate.setDate(date.getDate()+1);
    console.log(date);
    Food.find({date : {
        '$gte': date,
        '$lte': nextDate}}, 
    (err, food) => {
        if(err){
            res.send(err);
        }
        res.json(food); 
    });
}

getFoodWithID (req: Request, res: Response) {           
    Food.findById(req.params.foodId, (err,food) => {
        if(err){
            res.send(err);
        }
        res.json(food);
    });
}

updateFood (req: Request, res: Response) {           
    Food.findOneAndUpdate({ _id: req.params.foodId }, req.body, { new: true }, (err, food) => {
        if(err){
            res.send(err);
        }
        res.json(food);
    });
}

deleteFood (req: Request, res: Response) {           
    Food.remove({ _id: req.params.foodId }, err => {
        if(err){
            res.send(err);
        }
        res.json({ message: 'Successfully deleted Node!'});
    });
}




}

export default new FoodController();