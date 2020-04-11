import React, { Component } from 'react';
import axios from 'axios';


class MenuComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true,
            errors: null
        };
    }

    // Now we're going to make a request for data using axios
    getPosts() {
        const options = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'user-key': '769eead0dcfce8d55a40154cac886fde'
            }
        };
        axios.get('https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318', options)
            .then(response => {
                const posts =  response.data;
                this.setState({
                    posts: [this.state.posts, posts],
                    isLoading: false
                });
            })
            // If we catch any errors connecting, let's update accordingly
            .catch(error => this.setState({ error, isLoading: false }));
    }
    // Let's our app know we're ready to render the data
    componentDidMount() {
        this.getPosts();
    }
    // Putting that data to use
    render() {
        const { isLoading, posts} = this.state;
        return (
            <React.Fragment>
                <h2>List of Menu</h2>
                <div>
                    {!isLoading ? (
                        posts.map(post => {
                            const {id, name,cuisines} = post;
                            return (
                                <div key={id}>
                                    <h2>{name}</h2>
                                    <p>{cuisines}</p>
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