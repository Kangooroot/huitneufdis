//import logo from './logo.svg';
//import './App.css';

import React, { Component } from 'react';
import './App.css';
import Home from './home/Home'
import Orders from './orders/Orders'
import Alerts from './alerts/Alerts'
import Preparators from './preparators/Preparators'
import Initialisation from './autoFill/initialisation'
import Automation from './autoFill/Automation'
import { Switch, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            promise: null
        };
    }

    render() {

        return (


            <div className="App">
                <header className="App-header container-fluid">
                    <nav className="row">
                        <Link to="/" className={"col-lg-3 " + (this.context.router.route.location.pathname === '/' ? "active" : '')}>
                            <span className="glyphicon glyphicon-home"> </span>TABLEAU DE BORD
                        </Link>
                        <Link to="/commandes" className={"col-lg-3 " + (this.context.router.route.location.pathname === '/commandes' ? "active" : '')}>
                            <span className="glyphicon glyphicon-time"> </span>COMMANDES
                        </Link>
                        <Link to="/alertes" className={"col-lg-3 " + (this.context.router.route.location.pathname === '/alertes' ? "active" : '')}>
                            <span className="glyphicon glyphicon-exclamation-sign"> </span>REAPPROVISIONNEMENT
                        </Link>
                        <Link to="/preparateurs" className={"col-lg-3 " + (this.context.router.route.location.pathname === '/preparateurs' ? "active" : '')}>
                            <span className="glyphicon glyphicon-user"> </span>PREPARATEURS
                        </Link>
                    </nav>
                </header>
                <footer>

                </footer>
                <Switch>
                    <Route exact path='/'       component={Home}/>
                    <Route path='/commandes'    component={Orders}/>
                    <Route path='/alertes'      component={Alerts}/>
                    <Route path='/preparateurs' component={Preparators}/>
                    <Route path='/init'         component={Initialisation}/>
                    <Route path='/auto'         component={Automation}/>
                </Switch>
            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object
};

export default App;
