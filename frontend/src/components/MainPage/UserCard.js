import React, {Component} from 'react';
import Card from "react-bootstrap/Card";

import './css/UserCard.css';

function UserCard(props) {
    const {
        username,
        hw_id,
        mem,
        title
    } = props;

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {username}
                </Card.Title>
                <Card.Text>
                    <p className={'card-item'}>id: {hw_id}</p>
                    <p className={'card-item'}>Memory usage: {mem}</p>
                    <p className={'card-item'}>Active process: {title}</p>
                </Card.Text>
                <Card.Link href={'/user/__id__'}>
                    Details
                </Card.Link>
            </Card.Body>
        </Card>
    );
}

export default UserCard;