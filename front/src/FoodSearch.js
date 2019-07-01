import React from "react";
import axios from 'axios';


const MATCHING_ITEM_LIMIT = 10;

class FoodSearch extends React.Component {
  state = {
    foods: [],
    showRemoveIcon: false,
    searchValue: ""
  };

  constructor(props){
    super(props)
  }

  handleSearchChange = e => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    });

    if (value === "") {
      this.setState({
        foods: [],
        showRemoveIcon: false
      });
    } else {
      this.setState({
        showRemoveIcon: true
      });

  //    Client.search(value, foods => {
   //     this.setState({
   //       foods: foods.slice(0, MATCHING_ITEM_LIMIT)
 //       });
  //    });
      if(value.length > 2)
        axios.get('http://localhost:4200/api/food/ciqual/product/'+value).then(
          foods => {
            var res = foods.data
            if (res.hits) {
              res = res.hits.hits.map(x => x._source)
            }
            this.setState({foods: res.slice(0, MATCHING_ITEM_LIMIT) });
          }     
        )
    }
  };

  handleSearchCancel = () => {
    this.setState({
      foods: [],
      showRemoveIcon: false,
      searchValue: ""
    });
  };

  render() {
    const { showRemoveIcon, foods } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: "hidden" };

    const foodRows = foods.map((food, idx) => (
      <tr key={idx} onClick={() => this.props.onFoodClick(food.nomFr,food.code)}>
        <td>{food.nomFr}</td>
        <td className="right aligned">{food.kcal}</td>
        <td className="right aligned">{food.protein_g}</td>
        <td className="right aligned">{food.fat_g}</td>
        <td className="right aligned">{food.carbohydrate_g}</td>
      </tr>
    ));

    return (
      <div id="food-search">
        <table className="ui selectable structured large table">
          <thead>
            <tr>
              <th colSpan="5">
                <div className="ui fluid search">
                  <div className="ui icon input">
                    <input
                      className="prompt"
                      type="text"
                      placeholder="Search foods..."
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    />
                    <i className="search icon" />
                  </div>
                  <i
                    className="remove icon"
                    onClick={this.handleSearchCancel}
                    style={removeIconStyle}
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th className="eight wide">Description</th>
              <th>Kcal (per 100g)</th>
              <th>Proteins (per 100g)</th>
              <th>Lipids (per 100g)</th>
              <th>Glucids (per 100g)</th>
            </tr>
          </thead>
          <tbody>
            {foodRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FoodSearch;
