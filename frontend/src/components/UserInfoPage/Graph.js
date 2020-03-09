import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import Card from "react-bootstrap/Card";

import './css/Graph.css';

function Graph(props){
    const data = {
        labels: ['00:00','02:00','04:00','06:00', '08:00', '10:00', '12:00','14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
        datasets: [{
            label: 'CPU',
            data: [90, 100, 20, 40, 10, 3, 90, 100, 20, 40, 10, 100, 20, 40],
            borderColor: '#6e5773',
            fill: false,
            borderWidth: 2
        }, {
            label: 'MEMORY',
            data: [10, 3, 90, 100, 20, 40, 5, 100, 20, 10, 90, 20, 20, 40],
            borderColor: '#d45079',
            fill: false,
            borderWidth: 2
        }]
    };


    return (
        <Card body id={'graph'}>
            <Line data={data}/>
        </Card>
    );
}

export default Graph;