//import $ from 'jquery';
import React, { Component } from 'react';
import './orders.css';
import API from  '../API'
import Timer from '../Timer'

export default class Orders extends Component {

    constructor(props){
        super(props);
        this.state = {
            orders: []
        };
    }

    refreshContent() {

        var promise = API._GET("order/");

        var self = this;

        promise.then((json) => {

            self.setState({orders: json});

            setInterval(self.refreshContent(), 1000);

        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {

        this.refreshContent();
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
            <div id="orders" className="container-fluid">
                <h1 className="row">
                    <span className="glyphicon glyphicon-list-alt">&nbsp;</span>
                    Commandes
                </h1>
                {
                    this.state.orders.map((item) => {

                        return (
                            <div className="row col-lg-offset-1 col-lg-10 order" key={item._id}>

                                <div className="col-lg-12 id">{item._id}</div>

                                <div className="col-lg-6 preparator">{item.preparator.name}</div>

                                <Timer date={item.created_date}/>

                                <div className="col-lg-12 jauge">
                                    <span className="progression"></span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
