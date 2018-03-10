import React, { Component } from 'react';
import API from  '../API'

export default class Initialisation extends Component {

    constructor(props){

        super(props);
        this.state = {
            test: []
        };
    }

    test() {

       console.log(API._GET("preparator/"));
    }

    render() {
        return (
            <div id="init" className="col-lg-10 col-lg-offset-1">
                <h1>Initialisation</h1>
                <button onClick={this.test}>Click here to fill database</button>
            </div>
        );
    }
}
