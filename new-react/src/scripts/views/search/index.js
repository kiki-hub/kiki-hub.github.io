import React,{Component} from "react";
import "./index.scss";
import { Head } from "../../component/head";
import {SearchBar,WhiteSpace,Popover,Icon,Item} from "antd-mobile";

export class Search extends Component{
    todoSearch(val){
        console.log(val);
    }
    render(){
        return(
            <div className="search">
                <Head title="SEARCH" searchflag={true} show={true}></Head>
                <div style={{width:"100%",height:45}}></div>
                <SearchBar 
                onSubmit={this.todoSearch}
                placeholder="请输入商品名称" ref={ref => this.autoFocusInst = ref} />
                <WhiteSpace />
            </div>
        )
    }
}


