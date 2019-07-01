import * as mongoose from 'mongoose';

const Schema = mongoose.Schema

export const FoodSchema = new Schema(
    {
        name : {
            type : String,
            required : true
        },
        calories : {
            type : Number,
            default : 0
        },
        proteins :{
            type : Number,
            default : 0
        },
        lipids :{
            type : Number,
            default : 0
        },
        glucids : {
            type : Number,
            default : 0
        },
        animal : String,
        date : {
            type : Date,
            default : Date.now
        },
        quantity : Number,
        price : Number

    }
);