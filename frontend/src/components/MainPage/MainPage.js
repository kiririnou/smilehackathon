import React, {useState, useEffect} from 'react';
import UserCard from "./UserCard";

import './css/MainPage.css'
import {mockUsers} from '../../_mockData';

function MainPage(props) {
    let _timeout = null;
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        // todo: change url before prod
        fetch('some-url.xyz/api/v1/users')
            .then(res => res.json())
            .then(users => {
                setUsers(users);
                _timeout = setTimeout(fetchUsers, 500);
            })
            .catch(e => {
                console.log(e);
                _timeout = setTimeout(fetchUsers, 500);
            })
    };

    useEffect(() => {
        // todo: run fetchUsers() on mount
        return () => {
            clearTimeout(_timeout);
        }
    }, []);

    return (
        <div id={'main-page'}>
            // todo replace mockUsers with users
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

export default MainPage;