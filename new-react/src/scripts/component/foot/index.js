

import "./index.scss";
import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Badge} from "antd-mobile";

export const foots = [
    {txt:"首页",path:"/main/home",name:"home",icon:"icon-home"},
    {txt:"分类",path:"/main/classify",name:"classify",icon:"icon-goodsfill"},
    {txt:"购物车",path:"/main/cart",name:"cart",icon:"icon-shop_car"},
    {txt:"我",path:"/main/mine",name:"mine",icon:"icon-mine"}
]



export class Foot extends Component{
    constructor(){
        super();
        this.state={
            foots
        }
    }
    render(){
        const {
            foots,
        }=this.state;
        return (  
            <footer>
                {
                    foots.map((foot,i)=>{
                        return(
                            <div key={i}>
                                <NavLink
                                to={foot.path}
                                activeClassName="nav-active"
                                >
                                    <i className={"iconfont "+foot.icon}></i>
                                    <span>{foot.txt}</span>
                                    {i==2&& <Badge text="10" className="hot" hot style={{marginLeft:5}}></Badge>}

                                </NavLink>
                            </div>
                        )
                    })
                }
            </footer>
        )
    }
}