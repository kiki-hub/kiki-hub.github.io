import React,{Component} from "react";
import "./index.scss";
import { Head } from "../../component/head";


export class Scan extends Component{
    render(){
        return(
            <div className="scan">
                <Head title="扫一扫" searchflag={true} show={true} scan={true}></Head>
                
            </div>
        )
    }
}