import React,{Component} from "react";
import {NavLink} from "react-router-dom";
import "./index.scss";
import { Head } from "../../component/head";
import {List} from "antd-mobile";
import {history,axios} from "~";
import {Uploadimg} from "&/component/upload";

const Item = List.Item;

export class Mine extends Component{
    constructor(){
        super();
        this.state={
            isLogin:!!sessionStorage.token,
            mobile:"立即登录"
        }
    }
    componentDidMount(){
        // if(sessionStorage.token){
        //     this.setState({
        //         txt:sessionStorage.mobile,
        //     })
        // }
        axios.post("/react/getmobile").then(res=>{
            // console.log(res.data.result);
            if(!!res.data.type){
                this.setState({
                    mobile:res.data.result,
                })
            }
        })
    }

    leavelogin(){
        sessionStorage.clear();
        history.push("/login");
    }
        
    
    render(){
        const{
            mobile,
            isLogin
        }=this.state;
        return(
            <div className="mine">
                <Head title="MINE" show={true}></Head>
                <div style={{position:"fixed",top:"45px",left:0}}>
                    <div className="top" style={{background: 'url("../../../assets/images/banner1.jpg") center center'}}>
                    <div className="headpic">
                    <Uploadimg></Uploadimg>                          
                    </div>
                    <NavLink to="/login" style={{color:"#000",fontSize:"20px",fontWeight:"600",float:"left",marginTop:"40px",marginLeft:"10px"}}>{mobile}</NavLink>
                    </div>  
                    <List className="my-list" style={{marginTop:"10px"}}>
                        <Item arrow="horizontal" onClick={() => {}}>设置</Item>
                        <Item arrow="horizontal" onClick={() => {}}>关于APP</Item>
                        <Item arrow="horizontal" onClick={() => {}}>清除缓存</Item>
                        <Item arrow="horizontal" onClick={() => {}}>注销账户</Item>
                    </List>
                    <button onClick={this.leavelogin} style={{width:"100vw",height:"40px",backgroundColor:"white",marginTop:"10px",border:"0"}}>退出当前账户</button>
                </div>
            </div>
        )
    }
}