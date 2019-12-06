import React,{Component} from "react";
import "./index.scss";
import { Carousel} from 'antd-mobile';

export class Guide extends Component{
    constructor(){
        super();
        this.state={
            imgs:[
                require("../../../assets/images/2.jpg"),
                require("../../../assets/images/3.jpg"),
                require("../../../assets/images/4.jpg"),
                require("../../../assets/images/1.jpg"),
            ]
        }
    }

    gotoMain=()=>{
        const {
            history
        }=this.props;
        history.push('./main');
    }


    componentDidMount(){
        if(localStorage.pcount){
            localStorage.pcount++;
            if(localStorage.pcount>3){
                this.props.history.push("./main"); //访问三次以后重定向
            }
            
        }
        else{
            localStorage.pcount=1;
        }
    }

    render(){
        return(
            <div className="guide">
                    <Carousel
                    autoplay={false}
                    infinite
                    dots={false}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                    >
                   {
                       this.state.imgs.map((item,index)=>{
                           return(
                            <a 
                            key={index}
                            style={{ display: 'inline-block', width: '100%', height: "100vh" }}
                            >
                                <img 
                                src={item} 
                                alt=""
                                style={{ width: '100%', height: '100vh' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    // this.setState({ imgHeight: 'auto' });
                                  }}
                                />
                                {index==this.state.imgs.length-1&&<button className="g-btn" type="warning" onClick={this.gotoMain}>点击进入首页</button>}
                            </a>
                           )
                       })
                   }         
                    </Carousel>
                              
            </div>
        )
    }
}



{/* <Button>default</Button><WhiteSpace />
<Button disabled>default disabled</Button><WhiteSpace />

<Button type="primary">primary</Button><WhiteSpace />
<Button type="primary" disabled>primary disabled</Button><WhiteSpace />

<Button type="warning">warning</Button><WhiteSpace />
<Button type="warning" disabled>warning disabled</Button><WhiteSpace /> */}