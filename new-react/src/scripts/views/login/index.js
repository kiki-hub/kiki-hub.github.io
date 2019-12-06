import React,{Component} from "react";
import "./index.scss";
import { Head } from "../../component/head";
import {WhiteSpace,WingBlank,List,InputItem,Button} from "antd-mobile";
import {axios,history} from "~";

export const mobileReg=/^1(3|5|7|8|9)\d{9}$/;
export const codeReg=/^\d{4}$/;
var timer=null;
export class Login extends Component{
    constructor(){
        super();
        this.state={
            count:60,
            mobileFlag:false,
            loginFlag:false,
            txt:"发送验证码",
            toggle:true,
        }
    }

    // 手机号格式输入是否正确
    checkMobile=(mobile)=>{
        // console.log(this.mobile);
        // console.log(mobile);
        // if(mobileReg.test(mobile)){
        //     this.setState({
        //         mobileFlag:true,
        //     })
        // }
        // else{
        //     this.setState({
        //         mobileFlag:false,
        //     })
        // }

        // 上锁toggle,验证码倒计时时，手机号输入不能对它产生影响
        if(this.state.toggle){
            this.setState({
                mobileFlag:mobileReg.test(mobile),
                loginFlag:codeReg.test(this.code.state.value)&&mobileReg.test(mobile),
            });
        }       
    }


    // 验证码格式是否正确
    checkCode=(code)=>{
        // console.log(code);
        this.setState({
            loginFlag:codeReg.test(code)&&mobileReg.test(this.mobile.state.value),
        })
    }

    //发送验证码
    sendCode=()=>{
        //axios
        axios.post("/react/sendCode",{mobile:this.mobile.state.value}).then(res=>{
            if(res.data.type==1){
                console.log(res.data.msg)
            }
            else{
                console.log(res.data.msg)
            }
        })
        this.computedTime();
    }
    computedTime=()=>{
        this.setState({
            count:--this.state.count,
            txt:`倒计时 ${this.state.count}`,
            mobileFlag:false,
            toggle:false,
        });
        timer=setInterval(()=>{
            if(this.state.count>0){
                this.setState({
                    count:--this.state.count,
                    txt:`倒计时 ${this.state.count}`,
                    mobileFlag:false,
                })
            }
            else{
                clearInterval(timer);
                this.setState({
                    count:60,
                    mobileFlag:true,
                    txt:"发送验证码",
                    toggle:true,
                });
            }
        },1000);
    }

    // 校验验证码，判断登录是否成功
    todoLogin=()=>{
        axios.post("/react/checklogin",{
            mobile:this.mobile.state.value,
            code:this.code.state.value
        }).then(res=>{
            console.log(res);
            if(!!res.data.type){
                sessionStorage.token=res.data.token;
                sessionStorage.mobile=this.mobile.state.value;
                history.push("/main/mine");
            }
            else{
                sessionStorage.token="";
            }
        })
    }

    render(){
        const{
            txt,
            mobileFlag,
            loginFlag
        }=this.state;
        return(
            <div className="login">
                <Head title="LOGIN" show={true} login={true}></Head>
                <div style={{width:"100%",height:45}}></div>
                <WhiteSpace/>
                <WingBlank>
                    <List>
                    <WhiteSpace/>
                    <InputItem
                        type="tel"
                        placeholder="请输入手机号"
                        clear
                        ref={el=>this.mobile=el}
                        onChange={this.checkMobile}
                    >手机号</InputItem>
                     <WhiteSpace/>
                    <InputItem
                        type="number"
                        placeholder="请输入验证码"
                        clear
                        ref={el=>this.code=el}
                        onChange={this.checkCode}
                    >验证码</InputItem>
                    <Button onClick={this.sendCode} disabled={!mobileFlag} type="warning" className="l-btn" size="large" inline >{txt}</Button>
                    <WhiteSpace/>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.todoLogin} disabled={!loginFlag} >登录</Button>
                </WingBlank>
            </div>
        )
    }
}