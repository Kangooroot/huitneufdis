//import $ from 'jquery';
import React, { Component } from 'react';
import './alerts.css';
import API from  '../API'
import $ from 'jquery'

export default class Orders extends Component {

    constructor(props){
        super(props);
        this.state = {
            alerts: []
        };
    }

    refreshContent() {

        let promise = API._GET("alert/");

        let self = this;

        promise.then((json) => {

            self.setState({alerts: json});

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

    submit(id) {

        let quantity = parseInt($("#quantity_" + id).val(), 10);
        //console.log(quantity);
        //console.log(this.state.alerts[id]);

        // On va d'abord mettre à jour la quantité du produit
        let params = {"quantity": parseInt(this.state.alerts[id].product.quantity, 10) + quantity};

        let promise = API._PUT("product/" + this.state.alerts[id].product._id, params);

        promise.then(() => {

            console.log("quantité mise à jour");

            let promise = API._DELETE("alert/" + this.state.alerts[id]._id);

            promise.then(() => {

                $("#footer").append("<div class='notif success'>produit réapprovisionné avec succès</div>");
            });
        });
    }


    render() {

        return (
            <div id="alerts" className="container-fluid">
                <h1 className="row">
                    <span className="glyphicon glyphicon-list-alt">&nbsp;</span>
                    Alertes de réapprovisionnement
                </h1>
                {
                    this.state.alerts.map((item, index) => {

                        return (
                            <div className="row alert" key={index}>
                                <div className="col-lg-2 timer">
                                    <span className="glyphicon glyphicon-time"> </span>
                                    <span className="text">
                                        {
                                            this.getDateDifference(item.created_date)
                                        }
                                    </span>
                                </div>
                                <div className="col-lg-3 product">{item.product.name}</div>
                                <div className="col-lg-2 preparator">
                                    <span className="glyphicon glyphicon-user">&nbsp;</span>
                                    <span className="name">{item.preparator.name}</span>
                                </div>
                                <div className="quantity col-lg-2">
                                    Restants :&nbsp;<span className="value">{item.product.quantity}</span>
                                </div>
                                <div className="col-lg-3 ok">
                                    <input type="text" placeholder="Qté" id={"quantity_" + index}/>
                                    <button onClick={() => this.submit(index)} type="button">Réapprovisionné</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
