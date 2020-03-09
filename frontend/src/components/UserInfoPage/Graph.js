import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import Card from "react-bootstrap/Card";

import './css/Graph.css';

function Graph(props){
    const data = {
        labels: ['11:00', '11:01', '11:02', '11:03', '11:04', '11:05', '11:06', '11:07', '11:08', '11:09', '11:10', '11:11', '11:12', '11:13', '11:14', '11:15', '11:16', '11:17', '11:18', '11:19', '11:20'],
        datasets: [{
            label: 'CPU',
            data: [90, 100, 20, 40, 10, 3, 90, 100, 20, 40, 10, 100, 20, 40, 12, 90, 100, 20, 40, 10],
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