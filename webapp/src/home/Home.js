//import $ from 'jquery';
import React, { Component } from 'react';
import './home.css';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: []
        };
    }

    fetchData() {

    }

    componentDidMount() {

        this.fetchData();
    }

    render() {
        return (
            <div id="home" className="container-fluid">

            </div>
        );
    }
}
