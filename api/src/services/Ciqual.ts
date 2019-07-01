import { Request, Response, response } from 'express';
import axios from 'axios';


class Ciqual {

    getProducts(req: Request, res: Response){
        const product = req.params.product;
        const data = {
            from : 0,
            size: 10000,
            query: {
              bool: {
                must: [
                  {
                    multi_match: {
                      query: product,
                      fields: [
                        "nomIndexFr^2",
                        "nomFr"
                      ]
                    }
                  }
                ],
                should: [
                  {
                    prefix: {
                      nomSortFr: {
                        value: product,
                        boost: 2
                      }
                    }
                  }
                ]
              }
            },
            _source: {
              excludes: [
                "compos",
                "groupeAfficheEng",
                "nomEng",
                "nomSortEng",
                "nomSortFr",
                "nomIndexFr",
                "nomIndexEng"
              ]
            }
          }
          
        axios.post('https://ciqual.anses.fr/esearch/aliments/_search',data).then(
            foods => {
                res.send(foods.data)
            }
        )
    }

    getNutritients(req: Request, res: Response){
        const code = req.params.code;
        const data = {
            "from": 0,
            "size": 10000,
            "query": {
              "match_phrase": {
                "code": {
                  "query": code
                }
              }
            },
            "sort": "nomSortFr"
          }
    
        const nutritients = ["Energie, Règlement UE N° 1169/2011 (kcal/100g)","Protéines brutes, N x 6.25 (g/100g)","Glucides (g/100g)","Lipides (g/100g)"]
    
        axios.post('https://ciqual.anses.fr/esearch/aliments/_search',data).then(
            nutritients => {
                res.send(nutritients.data)
            }
        )
    }
}

export default new Ciqual();