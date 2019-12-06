import React,{Component} from "react";
import "./index.scss";
import { Head } from "../../component/head";
import {Button,NoticeBar,Checkbox} from "antd-mobile"
import {observer } from "mobx-react";
import ShopCar from "&/mobx/shopcar";

console.log(ShopCar);

@observer
class Cart extends Component{
    componentDidMount(){
        if(!ShopCar.carList.length>0){
            ShopCar.getCarList();
        }
    }

    checkOne=(e)=>{
        
        var checked = e.target.checked;
        var goodId = e.target.goodId;
        console.log(goodId);
        ShopCar.changeCheckOne(checked,goodId);
    }

    checkAll=(e)=>{
        console.log(e.target.checked);
        // ShopCar.quan = e.target.checked;
        ShopCar.changeQuan(e.target.checked)
    }

    reduce=(goodId,count)=>{
        if(count>1){
            ShopCar.changeOneCount(goodId,false);
        }
    }

    add = (goodId,count)=>{
        if(count<100){
            ShopCar.changeOneCount(goodId,true);
        }
    }

    changeCount=(goodId,v)=>{
        var count = v.target.value;
        if(count>1&&count<100){
            ShopCar.changeCountByGoodId(goodId,count*1)
        }
    }

    delSelect=()=>{
        ShopCar.delGoodBySelect();
    }

    render(){
        const {
            carList,
            quan,
            total,
            checkNum
        } = ShopCar;
        return(
            <div className="cart" style={{width:"100vw"}}>
                <Head title="CART" show={true}></Head>


                <div style={{ display: sessionStorage.token ? 'none' : 'block' }} >
                    {/* <Button type="primary" onClick={()=>userInfo.countDesc(6)}> 你尚未登陆,请马上登录 </Button> */}
                    <Button type="primary" > 你尚未登陆,请马上登录  </Button>
                </div>
                <div style={{ display: !sessionStorage.token ? 'none' : 'block' }}>
                    <div style={{ display: carList.length > 0 ? 'none' : 'block' }}>
                        <h2> 你 还买购买任何商品,购物车空空如也 , 请马上去购买 </h2>
                    </div>

                    <div style={{ display: !carList.length > 0 ? 'none' : 'block' }}  >
                        <div id="carDiv">
                            <div id="tbody">
                                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                                    即日-01.26，购「迪奥」，实付满600元，配送完成后赠50代金券。
                                </NoticeBar>
                                {
                                    carList && carList.map((i, index) => {
                                        return (
                                            i.good&&<ul className="tr" key={index} id={i._id}>
                                                <li style={{ width: "11%" }}>
                                                    <Checkbox 
                                                    checked={i.checked} 
                                                    goodId={i.goodId} 
                                                    onChange={this.checkOne} >
                                                    </Checkbox>
                                                </li>
                                                <li style={{ width: "24%" }}><img src={i.good.skuPic2} /></li>
                                                <li style={{ width: "38%" }}>
                                                    <p style={{ lineHeight: "18px", marginTop: '36px' }}>{i.good.skuName.slice(0, 6)}</p>
                                                    <p style={{ lineHeight: "18px" }}>￥{i.good.offerPrice}</p>
                                                </li>
                                                <li style={{ width: "26%" }}>
                                                    <span style={{ fontSize: '22px', marginRight: '3px' }} onClick={() => this.reduce(i.goodId, i.count)}>-</span>
                                                    <input goodsid={i.goodId} type="text" value={i.count} onChange={(v) => { this.changeCount(i.goodId, v) }} style={{ width: "54px", fontSize: '16px', textAlign: 'center', background: 'none', border: '0' }} />
                                                    <span style={{ fontSize: '22px' }} onClick={() => this.add(i.goodId, i.count)}>+</span>
                                                </li>
                                            </ul>
                                        )
                                    })
                                }
                            </div>
                            <div className="carFoot">
                                <Checkbox style={{ width: '4%', float: 'left', marginLeft: '2%', lineHeight: '50px', }} onClick={this.checkAll}  checked={quan} ></Checkbox>
                                <p onClick={this.delSelect} style={{ width: '28%', lineHeight: '50px', fontSize: '14px', color: "red", marginLeft: '4%' }} >删除选中</p>
                                <p style={{ width: '36%', lineHeight: '50px',color:"#fff" }}>
                                    商品总价:<span style={{ width: '100px',color:"red" }}>  {total} </span>
                                </p>
                                <p style={{ backgroundColor: '#5c3715', width: "26%", fontSize: '20px', lineHeight: '50px', textAlign: 'center', color: "#fff", letterSpacing: '2px' }} >下单 {checkNum}</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div style={{display:"flex",height:"150px",backgroundColor:"#fff",marginBottom:"10px"}}>
                    <div style={{width:50,height:"150px",textAlign:"center",lineHeight:"150px"}}>
                        <input type="checkbox"/>
                    </div>
                    <div style={{width:"120px",height:150}}>
                        <img style={{width:"120px",height:120,marginTop:"15px"}} src="https://ssl1.sephorastatic.cn/products/5/0/1/8/1/6/1_n_07836_210x210.jpg" />
                    </div>
                    <div style={{flex:"1",marginTop:"30px"}}>
                       <div>克里斯汀烈焰红唇迪奥 </div>
                       <div>
                           <p style={{marginTop:"10px"}}>￥330</p>
                           <div style={{display:"flex",border:"1px solid #000",width:"62px",marginTop:"10px"}}>
                               <span style={{display:"block",width:20,height:20,textAlign:"center",lineHeight:"20px"}}>-</span>
                               <input disabled style={{width:20,height:20,textAlign:"center",lineHeight:"20px",border:0,borderLeft:"1px solid #000",borderRight:"1px solid #000"}} value="1" type="number"/>
                               <span style={{display:"block",width:20,height:20,textAlign:"center",lineHeight:"20px"}}>+</span>
                            </div>
                        </div>
                    </div>                  
                </div> */}


            </div>
        )
    }
}


export default Cart;