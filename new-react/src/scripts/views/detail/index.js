import React,{Component} from "react";
import "./index.sass";
import { Head } from "../../component/head";
import {axios} from "../../../utils";
import { ActionSheet, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

export class Detail extends Component{
    constructor(){
        super();
        this.state={
            good:{},
            goodId:"",
            count:1
        }
    }

    //加入购物车的函数
    addToCar=()=>{
        axios.post("/react/addToShopCar",{
            goodId:this.props.location.search.split("?")[1],
            good:this.state.good,
            count:this.state.count
        }).then(res=>{
            
        })
    }

    //确认加入购物车
    showActionSheet = () => {
        const BUTTONS = ['确认', '取消'];
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          destructiveButtonIndex: BUTTONS.length - 2,
          // title: 'title',
          message: '确认要加入购物车吗',
          maskClosable: true,
          'data-seed': 'logId',
          wrapProps,
        },
        (buttonIndex) => {
          this.setState({ clicked: BUTTONS[buttonIndex] });
          if(buttonIndex==0){
            this.addToCar();
            console.log("添加购物车成功");
          }
          if(buttonIndex==1){
            console.log("取消加购");
          }
        });
    }


    // 点击立即购买，进入购物车页面
    gotoCart=()=>{
        const {
            history
        }=this.props;
        history.push("/main/cart");
    }

    componentDidMount(){
        // console.log(this.props);
        const{
            location
        }=this.props;
        // console.log(location.search.split("?")[1]);
        const skuId=location.search.split("?")[1];
        axios.get("/react/gethgood").then(res=>{
            // console.log(res);
            const good=res.data.result.filter((item)=>{
                return item.skuId==skuId;
            });
            this.setState({
                good:good[0],
                goodId:skuId,
            })
            // console.log(this.state.good);
        })
    }
    render(){
        return(           
            <div>
                <Head title="DETAIL" show={true}></Head>
                <div style={{width:"100vw",height:"45px"}}></div>
                <div style={{backgroundColor:"#fff"}}>
                    <img src={this.state.good.skuPic} style={{width:"100vw",height:"300px"}} alt=""/>
                    <div atyle={{fontSize:"16px"}}>
                        <p style={{padding:"0 10px",marginTop:"40px",fontWeight:"600"}}>{this.state.good.skuName}</p>
                        <p style={{padding:"10px"}}>{this.state.good.skuBrand}</p>
                        <p style={{padding:"0 10px",fontWeight:"600"}}>￥{this.state.good.offerPrice}</p>
                    </div>
                </div>
                <footer style={{position:"fixed",left:0,bottom:0}}>
                    <div style={{display:"flex"}}>
                        <div onClick={this.showActionSheet} style={{width:"50%",backgroundColor:"red",height:50,border:0,fontSize:"20px",color:"#fff",textAlign:"center",lineHeight:"50px"}}>加入购物车</div>
                        <div onClick={this.gotoCart} style={{width:"50%",backgroundColor:"black",height:50,border:0,fontSize:"20px",color:"#fff",textAlign:"center",lineHeight:"50px"}}>立即购买</div>
                    </div>
                </footer>
            </div>
        )
    }
}




