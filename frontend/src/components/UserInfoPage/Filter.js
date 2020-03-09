import React from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import './css/Filter.css';
import Range from "rc-slider/lib/Range";
import 'rc-slider/assets/index.css';
import {formatTime} from "../../utils";

export default function(props){
    function getTimeMarks() {
        const timeStamps = {};

        for(let minutes = 0; minutes <= 1440; minutes+=60){
            timeStamps[minutes] = formatTime(minutes);
        }

        return timeStamps;
    }

    const {sliderChangeHandler, timeRanges: {from, to}} = props;

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
                                <Form.Control type={'text'} id={'date-from'} value={from}/>
                                <Form.Control type={'text'} id={'date-to'} value={to}/>
                                <Button variant={'outline-primary'} id={'submit-date-btn'} type={'submit'}>Submit</Button>
                            </div>
                            <Range min={0}
                                   max={1440}
                                   marks={getTimeMarks()}
                                   defaultValue={[0, 1440]}
                                   step={1}
                                   pushable={1}
                                   onChange={sliderChangeHandler}
                            />
                        </Form.Group>
                    </Form>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}