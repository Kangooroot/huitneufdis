//import $ from 'jquery';
import React, { Component } from 'react';

export default class Timer extends Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    getDateDifference(date) {

        let created_date = new Date(date);
        let diff = Math.abs((new Date()).getTime() - created_date.getTime());

        let seconds = parseInt((diff/1000)%60, 10)
            , minutes = parseInt((diff/(1000*60))%60, 10)
            , hours = parseInt((diff/(1000*60*60))%24, 10);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ':' + minutes + ':' + seconds;
    }

    render() {
        return (
            <div className="timer">
                <span className="glyphicon glyphicon-time"> </span>
                <span className="text">
                    {
                        this.getDateDifference(this.props.date)
                    }
                </span>
            </div>
        );
    }
}
