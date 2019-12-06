import "./index.scss";
import React ,{Component} from "react";
import {TabBar} from "antd-mobile";
import {foots} from "../foot";
import PropTypes from "prop-types";
// import EventEmitter from "events";  //node 自带模块
// var myEvent = new EventEmitter(); //emit on

// export const foots = [
//     {txt:"首页",path:"/main/home",name:"home",icon:"icon-home"},
//     {txt:"分类",path:"/main/classify",name:"classify",icon:"icon-goodsfill"},
//     {txt:"购物车",path:"/main/cart",name:"cart",icon:"icon-shop_car"},
//     {txt:"我",path:"/main/mine",name:"mine",icon:"icon-mine"}
// ]

export class Afoot extends Component{
    constructor(){
        super();
        this.state={
            selectedTab:"home"
        }
    }

    componentDidMount(){
        // console.log(this.context.location);
        // console.log(this.context.location.pathname.split("/main/"));
        const tab=this.context.location.pathname.split("/main/")[1];
        this.setState({
            selectedTab:tab,
        });

        // 头部返回，底部高亮
        // if(localStorage.tab){
        //     console.log(localStorage.tab);
        //     this.setState({
        //         selectedTab:localStorage.tab,
        //     })
        //     localStorage.removeItem('tab');
        // }
        // myEvent.on("changetab",tab=>{
        //     console.log(tab);
        //     this.setState({
        //         selectedTab:tab,
        //     })
        // })
    }

    render(){
        // console.log(myEvent);      
        return(
            <div  className="footer">
                <TabBar                 
                    unselectedTintColor="#949494"
                    tintColor="#000000"
                    barTintColor="white"
                >
                    {
                        foots.map((foot,i)=>{
                            return (
                                <TabBar.Item
                                key={i}
                                title={foot.txt}
                                // badge={i==2&&10}
                                icon={<i style={{
                                    width: '30px',
                                    height: '30px',
                                    fontSize:'26px',
                                    }}
                                    className={'iconfont '+ foot.icon}
                                />
                                }
                                selectedIcon={<i style={{
                                    width: '30px',
                                    height: '30px',
                                    fontSize:'26px',
                                    }}
                                    className={'iconfont '+ foot.icon}
                                />
                                }
                                onPress={()=>{
                                    const {history}=this.props;
                                    // console.log(this.context);
                                    //控制高亮
                                    this.setState({
                                        selectedTab:foot.name,
                                    })
                                    history.push(foot.path);
                                }}
                                selected={this.state.selectedTab === foot.name}
                                >

                                </TabBar.Item>
                            )
                        })
                    }
                </TabBar>
            </div>
        )
    }
}


Afoot.contextTypes={
    history:PropTypes.object,
    location:PropTypes.object,
}
