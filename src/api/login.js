import axios from './axios';

export function login(user,pass) {
	return axios.post(`/login/login?user=${user}&pass=${pass}`)
		.then((data)=>data.data)
}
