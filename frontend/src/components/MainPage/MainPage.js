import React, {Component} from 'react';
import UserCard from "./UserCard";

import './css/MainPage.css'
import {mockUsers} from '../../_mockData';

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };


        this.timeout = null;
    }

    fetchUsers = () => {
        // todo: change url before prod
        fetch('some-url.xyz/api/v1/users')
            .then(res => res.json())
            .then(users => {
                this.setState({users});
                this.timeout = setTimeout(this.fetchUsers, 500);
            })
            .catch(e => {
                console.log(e);
                this.timeout = setTimeout(this.fetchUsers, 500);
            })
    };

    componentDidMount() {
        // todo: run fetchUsers() on mount
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        return (
            <div id={'main-page'}>
                {mockUsers.map(user =>
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