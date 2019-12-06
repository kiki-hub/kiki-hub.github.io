import React,{Component} from "react";
import {Switch,Route,Redirect} from "react-router-dom";
import { Guide } from "./guide";
import {Main} from "./main";
import {Login} from "./login";
import PropTypes from "prop-types";
import { Search } from "./search";
import {Scan} from "./scan";
import { Detail } from "./detail";
import { Cart } from "./cart";

export class Layout extends Component{
    getChildContext(){
        return{
            history:this.props.history,
            location:this.props.location,
        }
    }
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/" exact render={()=>(<Redirect to="/guide" />)} />
                    <Route path="/guide" component={Guide} />
                    <Route path="/main" component={Main} />
                    <Route path="/login" component={Login} />
                    <Route path="/search" component={Search} />
                    <Route path="/scan" component={Scan} />
                    <Route path="/detail" component={Detail} />
                    <Route render={()=>(<Redirect to="/main/home" />)} />
                </Switch>
            </div>
        )
    }
}

Layout.childContextTypes={
    history:PropTypes.object,
    location:PropTypes.object,
}