import React, { Component } from 'react';
import API from  '../API'
import $ from 'jquery'

export default class Automation extends Component {

    constructor(props){

        super(props);
        this.state = {
            lorem: ""
        };

        var self = this;

        $.get("https://loripsum.net/api/plaintext/allcaps/")
        .done((response) => {
            self.setState({lorem: response});
            return response;
        })
        .fail((e) => {
            console.log(e);
            return "Erreur";
        });
    }

    createCommand() {

        if(this.state.lorem === "") return "";

        let nbProducts = Math.floor((Math.random() * 30) + 1);

        console.log(this.state.lorem);

        let loremArray = this.state.lorem.split(/[ ,.;?:]+/);

        console.log(loremArray);

        let products = [];

        var self = this;

        for(let i=0; i < nbProducts; i++) {

            let name = "";
            for(let n=0; n<3; n++) {

                let randomWordId = Math.floor(Math.random() * loremArray.length);
                name += loremArray[randomWordId];
            }
            console.log(name);

            let weight = (Math.random() * 5) + 0.1;

            let X = Math.floor((Math.random() * 30) + 1);
            let Y = Math.floor((Math.random() * 10) + 1);
            let height = Math.floor((Math.random() * 4) + 1);
            let block = Math.floor((Math.random() * 4) + 1);

            let newProduct = {

                "name": name,
                "quantity": 100,
                "weight": weight,
                "position": {
                    "X": X,
                    "Y": Y,
                    "height": height,
                    "block": block
                }
            }
        }

        //setInterval(this.createCommand(), 5000);
    }

    componentDidMount() {

        this.createCommand();
    }

    render() {
        return (
            <div id="auto" className="col-lg-10 col-lg-offset-1">
                {
                    this.state.lorem
                }
                {
                    this.createCommand()
                }
            </div>
        );
    }
}
