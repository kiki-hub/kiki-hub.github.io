import React,{Component} from "react";
import "./index.scss";
import {Switch,Route,Redirect} from "react-router-dom";
import {Home} from "../home";
import {Classify} from "../classify";
import {Mine} from "../mine";
// import { Foot } from "../../component/foot";
import {Afoot} from "../../component/afoot";
import Cart from "../cart";

export class Main extends Component{
    render(){
        return(
            <div className="main" style={{width:"100vw",height:"100vh",marginTop:45}}>
                <Switch>
                    <Route path="/main/" exact render={()=>(<Redirect to="/main/home" />)} />
                    <Route path="/main/home" component={Home} />
                    <Route path="/main/cart" component={Cart} />
                    <Route path="/main/classify" component={Classify} />
                    <Route path="/main/mine" component={Mine} />
                    <Route render={()=>(<Redirect to="/main/home" />)} />
                </Switch>
                {/* <Foot></Foot> */}
                <Afoot history={this.props.history}></Afoot>
            </div>
        )
    }
}