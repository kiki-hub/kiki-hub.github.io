

// 封装轮播图组件  
import "./index.scss";

export class Swipe extends Component{
    render(){
        const {
            id,
            children
        }  = this.props;
        return (
            <div className="swiper-container" id={id}>
                <div className="swiper-wrapper">
                    {
                        children
                    }
                    {/* {
                        children.map((child,i)=>{
                            return (
                                <div key={i} className="swiper-slide">
                                    <img style={{height:250,width:'100%'}} src={child} alt=""/>
                                </div>
                            )
                        })
                    } */}
                </div>
            </div>
        )
    }

    componentDidMount(){
        const {id,swiperOptions,children} = this.props;
        if(children.length>0){
            let mySwiper = new Swiper("#"+id,swiperOptions)
        }
    }

    componentDidUpdate(){
        const {id,swiperOptions,children} = this.props;
        if(children.length>0){
            let mySwiper = new Swiper("#"+id,swiperOptions)
        }
    }
}

// 静态属性 
Swipe.Item = (props)=>{
    console.log(props);
    return (
        <div  className="swiper-slide"> 
            {props.children}
        </div> 
    )
}