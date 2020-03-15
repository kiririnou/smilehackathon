import React, {useState, useEffect} from 'react';

import UserCard from "./UserCard";
import {mockUsers} from "../../_mockData";

import './css/MainPage.css'

function MainPage(props) {
    let _timeout = null;
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        // todo: change url before prod

        const _localhost = `http://localhost:5000/api/v1/users`;

        try {
            const response = await fetch(_localhost);
            const users = await response.json();

            setUsers(users);

            _timeout = setTimeout(fetchUsers, 5000);
        } catch (e) {
            props.handleServerError();
            _timeout = setTimeout(fetchUsers, 5000);
        }
    };

    useEffect(() => {
        fetchUsers();
        return () => {
            clearTimeout(_timeout);
        }
    }, []);

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

export default MainPage;