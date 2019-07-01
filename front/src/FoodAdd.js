import React from "react";
import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'
const axios = require('axios');

class FoodAdd extends React.Component{

    state = {
        quantity : 1
    }
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    state = {}
   
    handleChange = (e, { value }) => 
        {
            //console.log("e.target.name",e.target.name)
            const name = e.target.name;
            console.log(this.state)
            this.setState({[name] : value });
        }

    handleSubmit(event) {

        event.preventDefault();
        console.log("date used to add",this.props.date)
        this.setState({date : new Date(this.props.date)});
        var state = this.state;
        state["date"] = new Date(this.props.date);

        for (var nutritient of ['calories','glucids','proteins','lipids']){
            var newNut = (parseFloat(this.state[nutritient])*parseFloat(this.state.quantity || 1));
            state[nutritient] = newNut.toFixed(1);
        }

        axios.post('http://localhost:4200/api/food/add',state).then(food => 
            {
            this.props.getFood(this.props.date);}
        )
      }
    componentWillReceiveProps(nextProps) {
        if (nextProps.addingFoods){
            console.log("nextProps.addingFoods",nextProps.addingFoods)
            if(nextProps.addingFoods["Name"] !== this.state.name && nextProps.addingFoods["Name"]) {
                this.setState({ name: nextProps.addingFoods["Name"] });
            }
            if(nextProps.addingFoods["Energie (kcal/100g)"] !== this.state.calories && nextProps.addingFoods["Energie (kcal/100g)"]) {
                this.setState({ calories: nextProps.addingFoods["Energie (kcal/100g)"].split(',').join('.') });
            }
            if(nextProps.addingFoods["Protéines brutes (g/100g)"] !== this.state.proteins && nextProps.addingFoods["Protéines brutes (g/100g)"]) {
                this.setState({ proteins: nextProps.addingFoods["Protéines brutes (g/100g)"].split(',').join('.') });
            }
            if(nextProps.addingFoods["Glucides (g/100g)"] !== this.state.glucids && nextProps.addingFoods["Glucides (g/100g)"]) {
                this.setState({ glucids: nextProps.addingFoods["Glucides (g/100g)"].split(',').join('.') });
            }
            if(nextProps.addingFoods["Lipides (g/100g)"] !== this.state.lipids && nextProps.addingFoods["Lipides (g/100g)"]) {
                this.setState({ lipids: nextProps.addingFoods["Lipides (g/100g)"].split(',').join('.') });
            }
        }
      }

    render(){
        const { value } = this.state
        
        //this.setState({name : this.props.addingFoods.Name})
        return(
          <Form onSubmit = {this.handleSubmit}>
            <Form.Group widths='equal'>
            <Form.Field control={Input} label='Name' name='name' value={this.state.name} placeholder='Name' onChange={this.handleChange} />
            <Form.Field control={Input} label='Calories' name='calories' value={this.state.calories} placeholder='Calories' onChange={this.handleChange} />
            <Form.Field control={Input} label='Proteins' name='proteins' value={this.state.proteins} placeholder='Proteins' onChange={this.handleChange} />
            <Form.Field control={Input} label='Glucids' name='glucids' value={this.state.glucids} placeholder='Glucids' onChange={this.handleChange} />
            <Form.Field control={Input} label='Lipids' name='lipids' value={this.state.lipids} placeholder='Lipids' onChange={this.handleChange} />
            <Form.Field control={Input} label='Quantity' name='quantity' placeholder='1.2' onChange={this.handleChange} />
            </Form.Group>
            <Form.Field control={Button} onSubmit={this.handleSubmit}>Add</Form.Field>
          </Form>
    )}
}

export default FoodAdd;