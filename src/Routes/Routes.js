import React, { Component } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom'
import ProductList from '../Components/Home/ProductList';

class Routes extends Component {
    render(){
        return(
            
            <Switch>
                <Route path='/' exact component={ProductList}></Route>
                <Redirect to='/'></Redirect>
            </Switch>
        )
    }
}


export default Routes;
