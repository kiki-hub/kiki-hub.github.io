import {HashRouter,Route} from "react-router-dom";
import React,{Component} from "react";
import { Layout } from "./views";



export class MainRouter extends Component{  
    render(){
        return(
            <HashRouter
            basename=""
            >
                <Route component={Layout} />
                {/* <Layout></Layout> */}
            </HashRouter>
        )
    }
}