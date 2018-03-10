//import $ from 'jquery';
import React, { Component } from 'react';
import './alerts.css';
import API from  '../API'

export default class Orders extends Component {

    constructor(props){
        super(props);
        this.state = {
            alerts: []
        };
    }

    refreshContent() {

        var promise = API._GET("alert/");

        var self = this;

        promise.then((json) => {

            self.setState({alerts: json.reverse()});

            setInterval(self.refreshContent(), 1000);

        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {

        this.refreshContent();
    }

    render() {
        return (
            <div id="alerts" className="container-fluid">
                <div className="row top">
                    <div className="col-lg-4"><span className="glyphicon glyphicon-briefcase">&nbsp;</span>Temps écoulé</div>
                    <div className="col-lg-4"><span className="glyphicon glyphicon-user">&nbsp;</span>Produit</div>
                    <div className="col-lg-4"><span className="glyphicon glyphicon-pencil">&nbsp;</span>Preparateur</div>
                </div>
                {
                    this.state.alerts.map((item) => {

                        return (
                            <div className="row" key={item._id}>
                                <div className="col-lg-4">{item.name}</div>
                                <div className="col-lg-4">{item.email}</div>
                                <div className="col-lg-4">{item.maxWeight}</div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
