import React, {useState, useEffect} from 'react';

import UserCard from "./UserCard";

import './css/MainPage.css'

function MainPage(props) {
    let _timeout = null;
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch(new URL(process.env.USERNAME, process.env.API_URL).href);
            const users = await response.json();

            setUsers(users);

            _timeout = setTimeout(fetchUsers, 500);
        } catch (e) {
            props.handleServerError('Server is not responding!');
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
            {users.length
                ? users.map(user =>
                    <UserCard username={user.username}
                              hw_id={user.hw_id}
                              mem={user.mem}
                              title={user.title}
                              key={user.id}
                              userId={user.id}
                    />)
                : <div style={{margin: '1rem', fontSize: '1.5rem'}}>Loading...</div>
            }
        </div>
    );
}

export default MainPage;