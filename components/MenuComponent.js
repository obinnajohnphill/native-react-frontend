import React, { Component } from 'react';
import axios from 'axios';


class MenuComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            daily_menus: [],
            isLoading: true,
            errors: null
        };
    }

    getRestaurants() {
        const options = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'user-key': '769eead0dcfce8d55a40154cac886fde'
            }
        };
        axios.get('https://developers.zomato.com/api/v2.1/dailymenu?res_id=16507624', options)
            .then(response => {
                let arr = [];
                arr = Object.entries(response.data).filter(e => e !== 'daily_menus,');
                console.log(arr[0][1])
               // const daily_menus = arr[0][1];
                this.setState({daily_menus: arr[0][1]});
            })
            // If we catch any errors connecting, let's update accordingly
           // .catch(error => this.setState({ error, isLoading: false }));
    }


    componentDidMount() {
        this.getRestaurants()
    }

    render() {
       // console.log('data' + Object.entries(this.state))
        const {daily_menus} = this.state;
        const list = daily_menus.map((item, index) => {
            return (
                <li className="list-container" key={index}>
                    <div className="text-container">
                        <h4>Dish Name: {item.daily_menu.name}</h4>
                        <h5>Start Date: {item.daily_menu.start_date}</h5>
                        <button className="btn">Add +</button>
                        <hr/>
                    </div>
                </li>
            );
        });

        return (
            <ul id="container" className="cf">
                {list}
            </ul>
        );
    }
}

// API Key: 769eead0dcfce8d55a40154cac886fde

// Get restaurant id: curl -X GET --header "Accept: application/json" --header "user-key: 769eead0dcfce8d55a40154cac886fde" "https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318"


export default MenuComponent;