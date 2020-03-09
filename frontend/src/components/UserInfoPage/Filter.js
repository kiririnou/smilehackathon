import React from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import './css/Filter.css';
import Range from "rc-slider/lib/Range";
import 'rc-slider/assets/index.css';

export default function(props){
    function formatTime(){
        const timeStamps = {};

        for(let minutes = 0, idx = 0; minutes <= 1440; minutes+=60, idx++){
            timeStamps[minutes] = `${Math.floor((minutes / 60))}:${(minutes % 60)}0`;
        }

        return timeStamps;
    }



    return(
        <Card id={'filter'}>
            <Card.Body>
                <Card.Title>
                    Preferences
                </Card.Title>
                <Card.Text>
                    <Form id={'filter-form'}>
                        <Form.Group>
                            <div id={'date-controls'}>
                                <Form.Control type={'date'} id={'date-input'}/>
                                <Form.Control type={'text'} id={'date-from'}/>
                                <Form.Control type={'text'} id={'date-to'}/>
                                <Button variant={'outline-primary'} id={'submit-date-btn'} type={'submit'}>Submit</Button>
                            </div>
                            <Range min={0}
                                   max={1440}
                                   marks={formatTime()}
                                   defaultValue={[0, 1440]}
                                   dots={true}
                                   step={1}
                                   pushable={1}
                            />
                        </Form.Group>
                    </Form>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}