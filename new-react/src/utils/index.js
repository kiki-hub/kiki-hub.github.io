

//一个模块暴露多个接口
export {axios} from "./axios";
export {history} from "./history";

const url=require('url');  //node自带

export function getQuery(search){
    return url.parse(search,true).query;
}