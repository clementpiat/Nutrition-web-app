import React from "react";
import axios from "axios";



class ConsumedFood extends React.Component{
  constructor(props){
    super(props);
    this.metaHandleClick = this.metaHandleClick.bind(this)
  }
  sum(foods, prop) {
    return foods
      .reduce((memo, food) => parseFloat(food[prop], 10) + memo, 0.0)
      .toFixed(2);
  }

  metaHandleClick(id){
    var that = this;
    return function handleClick(){
      that.props.removeFood(id);
    }
  }


  render(){
      const foodRows = this.props.foods.map((food, idx) => (
        <tr key={idx}>
          <td>{food.name}</td>
          <td className="right aligned">{food.calories}</td>
          <td className="right aligned">{food.proteins}</td>
          <td className="right aligned">{food.glucids}</td>
          <td className="right aligned">{food.lipids}</td>
          <td className="right aligned">  
            <button class="ui button" onClick={this.metaHandleClick(food._id)}>
              <i class="trash icon"></i>
              Remove
            </button>
          </td>
        </tr>
      ));
    
      return (
        <table className="ui selectable structured large table">
          <thead>
            <tr>
              <th colSpan="5">
                <h3>Consumed foods</h3>
              </th>
            </tr>
            <tr>
              <th className="eight wide">Name</th>
              <th>Calories</th>
              <th>Proteins</th>
              <th>Glucids</th>
              <th>Lipids</th>
            </tr>
          </thead>
          <tbody>
            {foodRows}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th className="right aligned" id="total-calories">
                {this.sum(this.props.foods, "calories")}
              </th>
              <th className="right aligned" id="total-proteins">
                {this.sum(this.props.foods, "proteins")}
              </th>
              <th className="right aligned" id="total-glucides">
                {this.sum(this.props.foods, "glucids")}
              </th>
              <th className="right aligned" id="total-lipids">
                {this.sum(this.props.foods, "lipids")}
              </th>
            </tr>
          </tfoot>
        </table>

            
      );
    }
    
  
}

export default ConsumedFood;

    
    
