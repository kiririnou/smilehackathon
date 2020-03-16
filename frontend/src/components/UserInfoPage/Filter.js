import React from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import './css/Filter.css';
import Range from "rc-slider/lib/Range";
import 'rc-slider/assets/index.css';
import {formatTime} from "../../utils";

export default function(props){
    const {sliderChangeHandler, buttonClickHandler, rangeChanged, timeRange: {from, to}} = props;

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
                                <div className="date-controls-wrapper">
                                    <Form.Control type={'date'}
                                                  id={'date-input'}
                                                  value={props.date}
                                                  onChange={props.dateChangeHandler}/>
                                    <Form.Control type={'text'} id={'date-from'} value={formatTime(from)}/>
                                    <Form.Control type={'text'} id={'date-to'} value={formatTime(to)}/>
                                </div>
                                <Button variant={'outline-primary'}
                                        id={'submit-date-btn'}
                                        type={'submit'}
                                        onClick={buttonClickHandler}>Update</Button>
                            </div>
                            <Range min={0}
                                   max={1439}
                                   defaultValue={[0, 1440]}
                                   step={1}
                                   pushable={1}
                                   onChange={sliderChangeHandler}
                                   onAfterChange={() => {rangeChanged(true)}}
                                   ref={props.handlesRefs}
                            />
                        </Form.Group>
                    </Form>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}