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
        let  array = [];
        let v = [];
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
                const iterator = arr[0][1].values();
                for (const value of iterator) {
                    Object.entries(value).forEach(element => {
                        array.push(element[1].dishes);
                    });
                }
                this.setState({daily_menus: array[1]});
            }).catch(error => {
              console.log(error.response)
        })
    }

    componentDidMount() {
        this.getRestaurants()
    }

    render() {
        const {daily_menus} = this.state;
        const list = daily_menus.map((item, index) => {
            return (
                <li className="list-container" key={index}>
                    <div className="text-container">
                        <h4>Dish Name: {item.dish.name}</h4>
                        <h4>Price: {item.dish.price}</h4>
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