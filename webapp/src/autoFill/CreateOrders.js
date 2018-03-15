import React, { Component } from 'react';
import API from  '../API'

export default class CreateOrders extends Component {

    constructor(props){

        super(props);
        this.state = {
            order: "",
            products: []
        };
    }

    createOrder() {


        API._GET("product/")
        .then((json) => {

            let products = json;

            let randomProducts = [];

            let nbProducts = Math.floor((Math.random() * 30) + 1);

            for(let i=0; i < nbProducts; i++) {

                let randomInd = Math.floor((Math.random() * products.length));
                let randomProduct = {
                    "product": products[randomInd]["_id"]
                };

                randomProducts.push(randomProduct);
            }

            console.log(randomProducts);

            let order = {
                "products": randomProducts
            };

            return order;
        })
        .then((order) => {

            let self = this;

            API._POST("order", order)
            .then((response) => {
                return response.json();
            })
            .then((json) => {

                self.setState({order: JSON.stringify(json)});
            })
            /*.then((response) => {

                console.log(response.json());
                //self.setState({order: JSON.stringify(clone.json())});
            })*/;
        });

        //setInterval(this.createCommand(), 5000);
    }

    componentDidMount() {

        this.createOrder();
    }

    render() {
        return (
            <div id="auto" className="col-lg-10 col-lg-offset-1">
                {this.state.order}
            </div>
        );
    }
}
