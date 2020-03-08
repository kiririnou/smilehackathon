import React, {Component, useReducer} from 'react';
import UserCard from "./UserCard";

import './css/MainPage.css'

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

        this.interval = null;

        this._users = [
            {
                "cpu": 55,
                "hw_id": "TESTID",
                "id": 1,
                "mem": 89,
                "title": "Dota 2 qwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqw",
                "username": "Suck-PC"
            },
            {
                "cpu": 55,
                "hw_id": "TESTID",
                "id": 1,
                "mem": 89,
                "title": "Dota 2 qwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqw",
                "username": "Suck-PC"
            },
            {
                "cpu": 55,
                "hw_id": "TESTID",
                "id": 1,
                "mem": 89,
                "title": "Dota 2 qwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqw",
                "username": "Suck-PC"
            },
            {
                "cpu": 55,
                "hw_id": "TESTID",
                "id": 1,
                "mem": 89,
                "title": "Dota 2 qwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqw",
                "username": "Suck-PC"
            },
            {
                "cpu": 55,
                "hw_id": "TESTID",
                "id": 1,
                "mem": 89,
                "title": "Dota 2 qwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqw",
                "username": "Suck-PC"
            },
            {
                "cpu": 55,
                "hw_id": "TESTID",
                "id": 1,
                "mem": 89,
                "title": "Dota 2 qwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqw",
                "username": "Suck-PC"
            },
            {
                "cpu": 55,
                "hw_id": "TESTID",
                "id": 1,
                "mem": 89,
                "title": "Dota 2 qwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqw",
                "username": "Suck-PC"
            },
            {
                "cpu": 55,
                "hw_id": "TESTID",
                "id": 1,
                "mem": 89,
                "title": "Dota 2 qwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqw",
                "username": "Suck-PC"
            },
            {
                "cpu": 55,
                "hw_id": "TESTID",
                "id": 1,
                "mem": 89,
                "title": "Dota 2 qwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqw",
                "username": "Suck-PC"
            },
            {
                "cpu": 55,
                "hw_id": "TESTID",
                "id": 1,
                "mem": 89,
                "title": "Dota 2 qwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqw",
                "username": "Suck-PC"
            },
            {
                "cpu": 55,
                "hw_id": "TESTID",
                "id": 1,
                "mem": 89,
                "title": "Dota 2 qwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqw",
                "username": "Suck-PC"
            },
            {
                "cpu": 55,
                "hw_id": "TESTID",
                "id": 1,
                "mem": 89,
                "title": "Dota 2 qwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqwqqwqwqwqwqqqwqwqwqwqwqwqw",
                "username": "Suck-PC"
            },

        ]
    }

    fetchUsers = () => {
        // todo: change url before prod
        fetch('http://51.158.177.205:1488/api/v1/users')
            .then(res => res.json())
            .then(users => this.setState({users}))
            .catch(e => clearInterval(this.interval))
    };

    componentDidMount() {
        // todo: uncomment before prod
        // this.interval = setInterval(this.fetchUsers, 500)

    }

    render() {
        return (
            <div id={'main-page'}>
                {this._users.map(user =>
                    <UserCard username={user.username}
                              hw_id={user.hw_id}
                              mem={user.mem}
                              title={user.title}
                              key={user.id}
                    />
                )}
            </div>
        );
    }
}

export default MainPage;