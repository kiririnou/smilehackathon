import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import Card from "react-bootstrap/Card";

import './css/Graph.css';

function Graph(props){
    const data = {
        datasets: [{
            label: 'CPU',
            data: props.usageData.cpu,
            borderColor: '#6e5773',
            fill: false,
            borderWidth: 2
        }, {
            label: 'MEMORY',
            data: props.usageData.mem,
            borderColor: '#d45079',
            fill: false,
            borderWidth: 2
        }]
    };

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                    callback(value) {
                        return value + "%"
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: "Percentage"
                }
            }],
            xAxes: [{
                type: 'time',

                ticks: {
                    maxTicksLimit: 10,
                    fontSize: 16,
                    unitStepSize: 1,
                    maxRotation: 0
                }
            }]
        },
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0, // disables bezier curves
                fill: false,
                stepped: false,
                borderDash: []
            }
        }
    };

    return (
        <Card body id={'graph'}>
            <Line data={data} options={options}/>
        </Card>
    );
}

export default Graph;