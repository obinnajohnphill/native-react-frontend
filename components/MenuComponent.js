import React, { Component } from 'react';
import axios from 'axios';


class MenuComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameList: ["Chicken","Lamb","Rice"]
        }
    }


    // make the GET request to fetch data from the URL then using promise function to handle response.
    componentDidMount() {
        const options = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                 'user-key': '769eead0dcfce8d55a40154cac886fde'
            }
        };
        axios.get('https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318', options)
            .then((response) => {
                console.log("RESPONSE: ", response);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            })
    }


    render() {
        return (
            <ul>
                {
                    this.state.nameList.map(user => <li>{user}</li>)
                }
            </ul>
        );
    }
}


// API Key: 769eead0dcfce8d55a40154cac886fde

// Get restaurant id: curl -X GET --header "Accept: application/json" --header "user-key: 769eead0dcfce8d55a40154cac886fde" "https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318"


export default MenuComponent;