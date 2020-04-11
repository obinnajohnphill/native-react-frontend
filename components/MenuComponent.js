import React, { Component } from 'react';
import axios from 'axios';


class MenuComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
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
        axios.get('https://developers.zomato.com/api/v2.1/restaurant?res_id=19333744', options)
            .then(response => {
                const restaurants = response.data;
                this.setState({
                    restaurants: [this.state.restaurants, restaurants],
                    isLoading: false
                });
            })
            // If we catch any errors connecting, let's update accordingly
            .catch(error => this.setState({ error, isLoading: false }));
    }


    componentDidMount() {
        this.getRestaurants()
    }


    render() {
        const { isLoading, restaurants} = this.state;
        return (
            <React.Fragment>
                <h2>List of Menu</h2>
                <div>
                    {!isLoading ? (
                        restaurants.map(restaurant => {
                            return (
                                <div key={restaurant.id}>
                                    <h2>{restaurant.name}</h2>
                                    <p>{restaurant.cuisines}</p>
                                    <hr />
                                </div>
                            );
                        })
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

// API Key: 769eead0dcfce8d55a40154cac886fde

// Get restaurant id: curl -X GET --header "Accept: application/json" --header "user-key: 769eead0dcfce8d55a40154cac886fde" "https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318"


export default MenuComponent;