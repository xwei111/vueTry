import axios from './axios';

export function login(account_id,pwd) {
	return axios.post(`/login?account_id=${account_id}&pwd=${pwd}`)
		.then((data)=>data.data)
}
