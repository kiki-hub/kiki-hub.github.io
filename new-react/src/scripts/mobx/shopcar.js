
import {observable,action,computed} from "mobx"
import {axios} from "~";
class ShopCar{
    @observable carList = [];   // 购物车商品数据
    // @observable total = 0;      // 购物车 商品总价格
    // @observable carNum = 0;     // 购物车 商品数量 
    // @observable checkNum = 0;     // 购物车 选中商品数量
    // @observable quan = false;     // 判断是否全部选中 


    @action getCarList =()=>{
        axios.post("/react/getCarList").then(res=>{
            this.carList = res.data.result;
        })
    }

    @action changeCheckOne=(checked,goodId)=>{
        // 修改单条选中 
        axios.post("/react/changechecked",{
            checked,goodId
        }).then(res=>{
            this.carList = this.carList.map((item)=>{
                if(item.goodId==goodId){
                    item.checked = checked;
                }
                return item;
            })
        })
        
    }

    @computed get carNum(){
        var num = 0;
        this.carList.forEach(item=>{
            num+=item.count;
        });
        return num;
    }

    @computed get checkNum(){
        var num = 0;
        this.carList.forEach(item=>{
            if(item.checked){
                num+=item.count;
            }
        });
        return num;
    }

    @computed get total(){
        var num = 0;
        this.carList.forEach(item=>{
            // console.log(item);
            if(item.checked){
                num+=item.count * item.good.offerPrice;
            }
        });
        return num;
    }

    @computed get quan(){
        var flag = true;
        this.carList.forEach(item=>{
            if(!item.checked){
                flag = false;
            }
        })
        return flag;
    }

    set quan(newval){  // 监听 quan
        this.carList = this.carList.map((item)=>{
            item.checked = newval;
            return item;
        })
    }

    @action changeQuan = checked =>{
        axios.post("/react/changechecked",{
            checked,
            goodId:"-1"
        }).then(res=>{
            this.carList = this.carList.map((item)=>{
                item.checked = checked;
                return item;
            })
        })
    }

    @action changeOneCount = (goodId,flag)=>{
        axios.post("/react/changecount",{
            flag,
            goodId,
            count:"-1"
        }).then(res=>{
            this.carList = this.carList.map((item)=>{
                if(item.goodId == goodId ){
                    item.count += flag ? 1: -1;
                }
                return item;
            })
        })
        
    }

    @action changeCountByGoodId = (goodId,count)=>{
        axios.post("/react/changecount",{
            goodId,
            count
        }).then(res=>{
            this.carList = this.carList.map((item)=>{
                if(item.goodId == goodId ){
                    item.count = count * 1;
                }
                return item;
            })
        })
        
    }

    @action delGoodBySelect = () => {
        axios.post("/react/delSelect").then(res=>{
            this.carList = this.carList.filter(item=>!item.checked);
        })
        

    }





    async fetchCarList(){
        let res = await  axios.post("/react/getCarList");
    }

}

export default new ShopCar();