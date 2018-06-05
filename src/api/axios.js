import axios from 'axios'
import store from '../store'
import { Loading } from 'element-ui';

const baseURL = process.env.API_HOST;

const service = axios.create({
	baseURL:baseURL,
	timeout:5000
})

let loadingInstance;

// request拦截器
service.interceptors.request.use(config =>{

	loadingInstance=Loading.service({ 
				fullscreen: true ,
				lock: true,
		        text: 'Loading',
		        spinner: 'el-icon-loading',
		        background: 'rgba(0, 0, 0, 0.7)'
		     });
	if(store.state.userInfo.token){
		// 让每个请求头部都携带token信息
    	config.headers['AccessToken'] = store.state.userInfo.token
	}
	return config
},error=>{
	Promise.resolve(error)
})

// respone拦截器
service.interceptors.response.use(response=>{
	loadingInstance.close()
	return response
},error=>{

	console.log('error',error)
	// const status = error.response.status

	// if(status==403){
	// 	sessionStorage.setItem('user','')
 //        sessionStorage.setItem('pass','')
	// }

	return Promise.reject(error)
})


export default service
