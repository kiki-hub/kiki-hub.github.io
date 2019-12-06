import React,{Component} from "react";
import {NavBar,Icon,Popover,ActionSheet} from "antd-mobile";
import "./index.scss";
import PropTypes from "prop-types";
import {history} from "~";
// import EventEmitter from "events";  //node 自带模块
// var myEvent = new EventEmitter(); //emit on
const Item = Popover.Item; //Popover静态属性
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
let wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };

export class Head extends Component{
    goback=()=>{
        // console.log(this.context.history);
        // console.log(this.context.history.location);
        // console.log(this.context.history.location);                
        // const tab=this.context.history.location.pathname.split("/main/")[1];
        // console.log(tab);
        // localStorage.setItem("tab",tab);
        // myEvent.emit("changetab",tab);
        this.context.history.go(-1);
        // console.log(this.context);
        // console.log(this.context.history.location);
    }
    gotosearch=()=>{
        history.push("/search");
    }

    render(){
        const {
            title,
            show,
            searchflag,
            scan,
            login,
        }=this.props;
        
        return(           
                <div >
                    <NavBar
                    className="head"
                    style={{color:"#000000"}}
                    mode="light"
                    icon={show&&<Icon type="left" />}
                    onLeftClick={show&&(() => this.goback())}
                    rightContent={[
                        !searchflag&&<Icon key="0" type="search" onClick={this.gotosearch} style={{ marginRight: '16px' }} />,
                        <Pop key="1"  scan={scan} login={login} />,
                    ]}
                    >{title}</NavBar>
                    {/* <div style={{width:"100vw",height:"45px"}}></div> */}
                </div>
        )
    }
}

Head.contextTypes={
    history:PropTypes.object,
    location:PropTypes.object,
}


class Pop extends Component{
    constructor(){
        super();
        this.state={
            visible:false,
        }
    }
    onSelect=(opt)=>{
        this.setState({
            visible:false,
            selected:opt.props.value,
        })
        console.log(opt);
        if(opt.props.value=='login'){
            history.push("/login");
        }
        if(opt.props.value=='scan'){
            history.push("/scan");
        }
        if(opt.props.value=='photo'){
            this.showActionSheet();
        }
    }
    handleVisibleChange=(visible)=>{
        this.setState({
            visible
        })
    }
    showActionSheet = () => {
        const BUTTONS = ['拍照', '从相册中选择', '确认', '删除', '取消'];
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          destructiveButtonIndex: BUTTONS.length - 2,
          // title: 'title',
          message: '丝芙兰获取相机',
          maskClosable: true,
          'data-seed': 'logId',
          wrapProps,
        },
        (buttonIndex) => {
            console.log(buttonIndex);
        });
      }

    render(){
        const{
            scan,
            login,
        }=this.props;
        return(
            <Popover 
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={[
              (!scan&&<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">扫一扫</Item>),
              (<Item key="5" value="photo" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>拍照</Item>),
              (!login&&<Item key="6"  value="login" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                <span style={{ marginRight: 5 }}>登录</span>
              </Item>)
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <Icon type="ellipsis" />
            </div>
          </Popover>
        )
    }
}