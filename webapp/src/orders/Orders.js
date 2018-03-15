//import $ from 'jquery';
import React, { Component } from 'react';
import './orders.css';
import API from  '../API'
import Timer from '../Timer'
import ProductList from './ProductList'
import $ from 'jquery'

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

            self.setState({orders: json.reverse()});

            setInterval(self.refreshContent(), 1000);

        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {

        this.refreshContent();
    }

    setActive(id) {

        let productList = $(".order#" + id + " .productList");
        let button = $(".order#" + id + " .deploy .indicator");

        if(productList.is(".active")) {
            productList.slideUp(500);
            productList.removeClass("active");
            button.removeClass("active");
        }
        else {
            productList.slideDown(500);
            productList.addClass("active");
            button.addClass("active");
        }
    }

    render() {
        return (
            <div id="orders" className="container-fluid">
                <h1 className="row">
                    <span className="glyphicon glyphicon-list-alt">&nbsp;</span>
                    Commandes
                </h1>
                {
                    this.state.orders.map((item, i) => {

                        return (
                            <div className="row col-lg-offset-1 col-lg-10 order" key={i} id={item._id}>

                                <div className="row first">
                                    <div className="col-lg-6 id">Commande <span>#{item._id}</span></div>

                                    <div className="col-lg-6"><Timer date={item.created_date}/></div>
                                </div>
                                <div className="row jauge">
                                    <span className="progression"></span>
                                </div>
                                <div className="row second">
                                    <div className="col-lg-6 deploy">
                                        <button onClick={() => this.setActive(item._id)}>{item.products.length} produits</button>
                                        <span className="indicator"><span className="glyphicon glyphicon-chevron-right"> </span></span>
                                    </div>
                                    <div className={"col-lg-6 preparator" + (item.preparator === null ? " none" : "")}>
                                        <span className="glyphicon glyphicon-user">&nbsp;</span>
                                        {
                                            item.preparator === null ? "en attente de sélection..." : item.preparator.name
                                        }
                                    </div>
                                </div>
                                <ProductList products={item.products} active={true}/>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}