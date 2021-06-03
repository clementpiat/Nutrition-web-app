import React, { Component } from "react";
import FoodSearch from "./FoodSearch";
import ConsumedFood from "./ConsumedFood";
import FoodAdd from "./FoodAdd";
import Calendar from "./Calendar";

import moment from 'moment'
const axios = require('axios');


class App extends Component {
  

  state = {
  }

  constructor(props){
    super(props)
    this.state.consumedFoods = [];
    this.state.date = moment().format('YYYY-MM-DD');
    this.state.addingFoods = {};
    this.removeFood = this.removeFood.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onFoodClick = this.onFoodClick.bind(this)
  }

  changeFormat(value){
    return value.split('-').reverse().join('-')
  }
  removeFoodItem = itemIndex => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx
    );
    this.setState({ selectedFoods: filteredFoods });
  };

  componentDidMount(){
    this.getFood(this.state.date);
  }

  getFood = (date) => {
    if(date)
      axios.get('http://localhost:4200/api/food/'+date).then(res => {
        this.setState({consumedFoods : res.data})
      })
    else{
      console.log('no date')
      this.setState({consumedFoods : []})
    }

  }

  changeDate(date){
    this.setState({
      consumedFoods : this.state.consumedFoods,
      date : date
    })
    console.log("date changed to",date)
    this.getFood(date);
  }

  removeFood(id){
    axios.delete('http://localhost:4200/api/food/'+id).then(
      res => {
        console.log(res)
        this.getFood(this.state.date)
      }
    )
  }

  onFoodClick(name,code){
    console.log(name,code)
    const nutritients = ["Energie, Règlement UE N° 1169/2011 (kcal/100 g)","Protéines, N x 6.25 (g/100 g)","Glucides (g/100 g)","Lipides (g/100 g)"]
    const d = {
      "Energie, Règlement UE N° 1169/2011 (kcal/100 g)" : "Energie (kcal/100g)",
      "Protéines, N x 6.25 (g/100 g)" : "Protéines brutes (g/100g)",
      "Glucides (g/100 g)" : "Glucides (g/100g)",
      "Lipides (g/100 g)" : "Lipides (g/100g)" 
    }
    axios.get('http://localhost:4200/api/food/ciqual/code/'+JSON.stringify(code)).then(
      res => {
        var res = res.data;
        console.log(res);
        res = res.hits.hits[0]._source.compos
                    .filter(x => nutritients.indexOf(x.constNomFr)>-1)
                    .map(x => [d[x.constNomFr],x.compoTeneur])
        var data = {Name : name}
        console.log(res);
        for (var i =0;i<res.length;i++)
          data[res[i][0]] = res[i][1]
        console.log("data",data)
        this.setState({addingFoods : data})
      }
    )
  }

  render() {
    const { consumedFoods,date,addingFoods } = this.state;

    return (
      <div className="App">
        <div className="ui text container">
          <h1>{this.changeFormat(date)}</h1>
          <Calendar changeDate = {this.changeDate.bind(this)} ></Calendar>
          <ConsumedFood foods={consumedFoods} removeFood = {this.removeFood} />
          <br></br>
          <br></br>
          <FoodAdd getFood = {this.getFood.bind(this)} date={date} addingFoods = {addingFoods}></FoodAdd>
          <br></br>
          <br></br>
          <FoodSearch onFoodClick = {this.onFoodClick}></FoodSearch>
        </div>
      </div>
    );
  }
}

export default App;