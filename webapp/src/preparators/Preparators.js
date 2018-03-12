//import $ from 'jquery';
import React, { Component } from 'react';
import './preparators.css';
import API from  '../API'

export default class Preparators extends Component {

    constructor(props){
        super(props);
        this.state = {
            preparators: []
        };
    }

    refreshContent() {

        var promise = API._GET("preparator/");

        var self = this;

        promise.then((json) => {

            self.setState({preparators: json});

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
            <div id="preparators" className="container-fluid">
                <div className="row top">
                    <div className="col-lg-4"><span className="glyphicon glyphicon-user">&nbsp;</span>Nom</div>
                    <div className="col-lg-4"><span className="glyphicon glyphicon-pencil">&nbsp;</span>Adresse e-mail</div>
                    <div className="col-lg-4"><span className="glyphicon glyphicon-briefcase">&nbsp;</span>Poids maximal supporté (Kg)</div>
                </div>
                <div>
                    {
                        this.state.preparators.map((item) => {

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
            </div>
        );
    }
}
