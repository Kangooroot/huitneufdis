//import $ from 'jquery';
import React, { Component } from 'react';

export default class ProductList extends Component {

    constructor(props){
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className={"row productList"}>
                {
                    (typeof(this.props.products) !== "undefined" && this.props.products.length > 0) ? (

                        <div className="row top col-lg-12">
                            <div className="col-lg-3">Nom du produit</div>
                            <div className="col-lg-2">Poids (kg)</div>
                            <div className="col-lg-2">Quantité</div>
                            <div className="col-lg-1">N° Allée</div>
                            <div className="col-lg-1">N° Rangée</div>
                            <div className="col-lg-1">Hauteur</div>
                            <div className="col-lg-1">Bloc</div>
                            <div className="col-lg-1">Scanné</div>
                        </div>
                    ) : null
                }

                {

                    this.props.products.map((item, i) => {

                        //console.log(item.product);
                        if(typeof(item.product) !== 'undefined') {
                            return (
                                <div className="row col-lg-12" key={i}>
                                    <div className="col-lg-3 name">
                                        ► {item.product.name}
                                    </div>
                                    <div className="col-lg-2 weight">
                                        {item.product.weight}
                                    </div>
                                    <div className="col-lg-2 quantity">
                                        {item.quantity}
                                    </div>
                                    <div className="col-lg-1 position">
                                        {item.product.position.X}
                                    </div>
                                    <div className="col-lg-1 position">
                                        {item.product.position.Y}
                                    </div>
                                    <div className="col-lg-1 position">
                                        {item.product.position.height}
                                    </div>
                                    <div className="col-lg-1 position">
                                        {item.product.position.block}
                                    </div>
                                    <div className="col-lg-1 scanned">
                                        <span className={"glyphicon " + (item.scanned ? "glyphicon-ok-sign" : "glyphicon-remove-sign")}> </span>
                                        <span className="text">{item.scanned ? "Ok" : "En cours"}</span>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            //console.log(item);
                            return "";
                        }
                    })
                }
            </div>
        );
    }
}