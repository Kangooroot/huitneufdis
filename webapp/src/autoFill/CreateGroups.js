import React, { Component } from 'react';
import API from  '../API'
import './autoFill.css'

export default class CreateGroups extends Component {

    constructor(props){

        super(props);
        this.state = {
            preparators: [],
            group: [],
            selected: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createGroup() {


        API._GET("order/")
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

        let self = this;

        API._GET("preparator/")
        .then((json) => {
            self.setState({preparators: json});
            self.setState({selected: json[0]});
        });

        //this.createGroup();
    }

    handleChange(event) {
        this.setState({selected: event.target.value});
    }

    handleSubmit(e) {

        e.preventDefault();
        console.log(this.state.selected);

        let self = this;

        API._POST("group/", {})
        .then((json) => {
            self.setState({preparators: json});
            self.setState({selected: json[0]});
        });
    }

    render() {
        return (
            <div id="auto" className="col-lg-8 col-lg-offset-2">
                <h1>Créer un groupement de commandes</h1>
                <h3>Sélectionnez un préparateur (pour son poids max)</h3>
                <form onSubmit={this.handleSubmit}>
                    <select name="preparator" value={this.state.selected} onChange={this.handleChange}>
                        {
                            this.state.preparators.map((preparator, i) => {

                                return (
                                    <option value={preparator._id} key={preparator._id}>
                                        {preparator.name} ({preparator.maxWeight})
                                    </option>
                                )
                            })
                        }
                    </select>
                    <input type="submit" value="Créer"/>
                </form>
            </div>
        );
    }
}
