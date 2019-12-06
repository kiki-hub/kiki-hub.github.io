import React,{Component} from "react";
import "./index.scss";
import { Head } from "../../component/head";
import {axios} from "../../../utils";
import { Carousel,Grid} from 'antd-mobile';

export class Home extends Component{
    constructor(){
        super();
        this.state={
            imgs:[],
            imgHeight:"",
            goodsList:[],
        }
    }

    gotodetail=(skuId)=>{
        const {
            history,
        }=this.props;
        history.push(`../detail?${skuId}`);
    }

    componentDidMount(){
        axios.get("/react/getbanner").then(res=>{
            console.log(res);
            this.setState({
                imgs:res.data.result,
            })
        })
        axios.get("/react/gethgood").then(res=>{
            console.log(res);
            this.setState({
                goodsList:res.data.result,
            })
        })
    }
    render(){
        return(
            <div className="home">
            <Head title="SEPHORA" show={true}></Head>
                <Carousel
                style={{width:"100vw"}}
                autoplay={true}
                infinite
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
                >
                {this.state.imgs.map((img,i) => (
                    <a
                    key={i}
                    href="http://www.alipay.com"
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                    <img
                        src={img.imgs}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        this.setState({ imgHeight: 'auto' });
                        }}
                    />
                    </a>
                ))}
                </Carousel>
                <GridExample/> 
                      
                <div style={{marginTop:"10px",background:"#fff"}}>
                    <h2 style={{width:"100vw",height:50,lineHeight:"50px",textAlign:"center",fontWeight:"500",letterSpacing:"3px"}}>为你而选</h2>
                    {
                        this.state.goodsList.map((good,i)=>{
                           return(
                            <div key={i} onClick={()=>this.gotodetail(good.skuId)} style={{width:"50%",height:"250px",backgroundColor:"#fff",float:"left"}}>
                                <img src={good.skuPic} style={{width:"100%",height:"150px"}} alt=""/>
                                <div style={{width:"100%" ,textAlign:"center"}}>
                                    <p style={{fontSize:"14px",display:"block",marginTop:"5px"}}>{good.skuBrand}</p>
                                    <p style={{fontSize:"14px",display:"block",margin:"5px 0",padding:"0 30px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{good.skuName}</p>
                                    <p style={{fontSize:"14px",display:"block"}}>￥{good.offerPrice}</p>
                                </div>
                            </div>
                           )
                        })
                    }
                </div>
                
            </div>
        )
    }
}



// 宫格
const data = Array.from(new Array(8)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `name${i}`,
  }));

const GridExample = () => (
    <div>
      {/* <div className="sub-title">Always square grid item </div> */}
      <Grid data={data} activeStyle={false} />
    </div>
  );