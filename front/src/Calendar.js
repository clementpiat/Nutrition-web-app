import React from "react";
import {DateInput, TimeInput, DateTimeInput, DatesRangeInput} from 'semantic-ui-calendar-react';
import {Form} from 'semantic-ui-react'

class Calendar extends React.Component {

    constructor(props) {
        super(props);
     
        this.state = {
          date: ''
        }; 
      }

    changeFormat(value){
        return value.split('-').reverse().join('-')
    }

    handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
        this.setState({ [name]: value });
        value = this.changeFormat(value);
        this.props.changeDate(value);
    }
    }
     

    componentDidMount(){
        
    }

    render(){
       
        return(
            <Form>
                <DateInput
                    name="date"
                    placeholder="Date"
                    value={this.state.date}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
            </Form>
        )
    }
}

export default Calendar;