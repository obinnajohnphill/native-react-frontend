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
        axios.get('https://developers.zomato.com/api/v2.1/restaurant?res_id=19333744', options)
            .then(response => {
                const daily_menus = response.data;
                this.setState({
                    daily_menus: [this.state.daily_menus, daily_menus],
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
        const { isLoading, daily_menus} = this.state;
        return (
            <React.Fragment>
                <h2>List of Menu</h2>
                <div>
                    {!isLoading ? (
                        daily_menus.map(daily_menu => {
                            return (
                                <div key={daily_menu.id}>
                                    <h2>{daily_menu.name}</h2>
                                    <p>{daily_menu.cuisines}</p>
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