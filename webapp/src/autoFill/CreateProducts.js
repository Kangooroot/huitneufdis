import React, { Component } from 'react';
import API from  '../API'
import $ from 'jquery'

export default class CreateProducts extends Component {

    constructor(props){

        super(props);
        this.state = {
            lorem: "",
            product: ""
        };
    }

    createProduct() {

        if(this.state.lorem === "") return "";

        let loremArray = this.state.lorem.split(/[\s,.;?:-]+/);

        console.log(loremArray);

        let self = this;

        let name = "";
        for(let n=0; n<3; n++) {

            let randomWordId = Math.floor(Math.random() * loremArray.length);
            name += (name === "" ? "" : " ") + loremArray[randomWordId];
        }

        let quantity = Math.floor((Math.random() * 50) + 10);
        let weight = (Math.random() * 5) + 0.1;

        let X = Math.floor((Math.random() * 30) + 1);
        let Y = Math.floor((Math.random() * 10) + 1);
        let height = Math.floor((Math.random() * 4) + 1);
        let block = Math.floor((Math.random() * 4));

        let newProduct = {

            "name": name,
            "quantity": quantity,
            "weight": weight,
            "position": {
                "X": X,
                "Y": Y,
                "height": height,
                "block": block
            }
        };

        API._POST("product", newProduct)
        .then((response) => {

            return response.json();
        })
        .then((json) => {

            self.setState({product: JSON.stringify(json)});
        });
    }

    componentDidMount() {

        let self = this;

        $.get("https://loripsum.net/api/plaintext/allcaps/")
            .done((response) => {
                self.setState({lorem: response});
                this.createProduct();
                return response;
            })
            .fail((e) => {
                console.log(e);
                return "Erreur";
            });
    }

    componentDidUpdate() {

        //setInterval(this.createProduct(), 1000);
    }

    render() {
        return (
            <div id="auto" className="col-lg-10 col-lg-offset-1">
                {this.state.product}
            </div>
        );
    }
}
