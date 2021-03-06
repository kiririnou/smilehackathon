import React from 'react';
import Card from "react-bootstrap/Card";

import './css/UserCard.css';

function UserCard(props) {
    const {
        username,
        hw_id,
        mem,
        title,
        userId
    } = props;

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {username}
                </Card.Title>
                <Card.Text>
                    <p className={'card-item hw_id'}>id: {hw_id}</p>
                    <p className={'card-item mem'}>Memory usage: {mem}</p>
                    <p title={title} className={'card-item active-process'}>Active process: {title}</p>
                </Card.Text>
                <Card.Link href={`/user/${hw_id}_${userId}`}>
                    Details
                </Card.Link>
            </Card.Body>
        </Card>
    );
}

export default UserCard;