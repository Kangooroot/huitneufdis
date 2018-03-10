//import $ from 'jquery';
import React, { Component } from 'react';
import './orders.css';

export default class Orders extends Component {

    constructor(props){
        super(props);
        this.state = {
            preparators: []
        };
    }

    fetchData() {

        fetch('http://localhost:3001/order/')
            .then((results) => {
                return results.json();
            })
            .then((json) => {

                let preparators = json.map((item) => {

                    return (
                        <div className="row" key={item._id}>
                            <div className="col-lg-4">{ item.name }</div>
                            <div className="col-lg-4">{ item.email }</div>
                            <div className="col-lg-4">{ item.maxWeight }</div>
                        </div>
                    )
                });

                this.setState({preparators: preparators});

                console.log("state", this.state.preparators);
            });
    }

    componentDidMount() {

        this.fetchData();
    }

    render() {
        return (
            <div id="preparators" className="container-fluid">
                <div className="row top">
                    <div className="col-lg-4"><span className="glyphicon glyphicon-user">&nbsp;</span>Nom</div>
                    <div className="col-lg-4"><span className="glyphicon glyphicon-pencil">&nbsp;</span>Adresse e-mail</div>
                    <div className="col-lg-4"><span className="glyphicon glyphicon-briefcase">&nbsp;</span>Poids maximal supporté (Kg)</div>
                </div>
                { this.state.preparators }
            </div>
        );
    }
}
