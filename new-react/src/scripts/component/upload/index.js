import React,{Component} from "react";
import "./index.scss";
import {axios} from "~";

import initSrc from "../../../assets/images/photo.png";

export class Uploadimg extends Component{
    constructor(){
        super();
        this.state={
            pic:initSrc,
        }
    }
    startsend=()=>{
        this.file.click();
    }
    uploadFile=()=>{
        console.log('start upload');
        console.log(this.file);
        var file = this.file.files[0];
        console.log(file);
        var data = new FormData();
        data.append('avatar',file);
        console.log(data);
        axios({
            url:"/react/uploadavatar",
            method:"POST",
            data
        }).then(res=>{
            console.log(this.data);
            this.setState({
                pic:res.data.path.replace("public","http://localhost:1909/"),
            })
        })
    }
    render(){
        const{
            pic
        }=this.state;
        return(
            <div>
                <img src={pic} alt="" className="touxiang" onClick={this.startsend} />
                <input onChange={this.uploadFile} type="file" ref={el=>this.file=el} className="uploadinp"/>
                {/* <input onChange={this.uploadFile} type="file" ref={el=>this.file=el} className="uploadinp" /> */}
            </div>
        )
    }
}