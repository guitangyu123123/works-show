import axios from 'axios';
//封装axios
var myaxios = {};
myaxios.install = function (Vue) {
  var axios_obj = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/',
    headers:{'Authorization':window.localStorage.getItem('token')}
  })
  Vue.prototype.$myHttp = axios_obj;
}
export default myaxios;
