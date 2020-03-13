import React, {useState, useEffect} from 'react';
import UserCard from "./UserCard";

import './css/MainPage.css'

function MainPage(props) {
    let _timeout = null;
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        // todo: change url before prod
        fetch('http://51.158.177.205:1488/api/v1/users')
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
        fetchUsers();
        return () => {
            clearTimeout(_timeout);
        }
    }, []);

    return (
        <div id={'main-page'}>
            {users.map(user =>
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