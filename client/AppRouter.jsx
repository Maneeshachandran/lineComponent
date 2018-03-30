import React,  {Component} from 'react';
import Line from './components/lineComponent.jsx';

import { HashRouter, Route, Switch} from 'react-router-dom';
export default class AppRouter extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <HashRouter>
      <Switch>
        <Route path='/' component={Line} exact/>

      </Switch>
      </HashRouter>
    );
  }
};
