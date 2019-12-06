import React,{Component} from "react";
import "./index.scss";
import { Head } from "../../component/head";
import {Tabs} from "antd-mobile";
import {axios} from "~";
// import { Uploadimg } from "../../component/upload";

export class Classify extends Component{
    constructor(){
      super();
      this.state={
        classifyList:[],
      }
    }
    componentDidMount(){
      axios.post("/react/getclassify").then(res=>{
        console.log(res.data.result);
        this.setState({
          classifyList:res.data.result,
        })
      })
    }
    render(){
        console.log(this.state.classifyList);
        const {
          classifyList
        }=this.state;
        return(
            <div className="classify" style={{width:"100vw",height:"100vh"}}>
                <Head title="CLASSIFY" show={true}></Head>
                
                <div style={{ height:"500px",position:"fixed",top:"45px",left:0}}>
                <Tabs
                  tabs={tabs}
                  style={obj.one.height}
                  initalPage={'t2'}
                  tabBarPosition="left"
                  tabDirection="vertical"
                >

                  {
                    classifyList.map((item,i)=>{
                      return(
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                          {
                            item.childCategory.map((item,i)=>{
                              return(
                                <div key={i} style={{width:"200",height:"40px",margin:"20px",textAlign:"center",lineHeight:"40px"}}>{item.content}</div>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }              
                </Tabs>
              </div>

            </div>
        )
    }
}


const tabs = [
  { title: '功效' },
  { title: '护肤' },
  { title: '彩妆' },
  { title: '香水' },
  { title: '工具' },
  { title: '男士' },
  { title: '洗浴护体' },
  { title: '美发护发' },
  { title: '肤食' },
];

const obj={
  one:{
    height:"8%",
  }
}


  