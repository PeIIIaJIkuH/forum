import axios from 'axios'

export const PROTOCOL = 'https'
const BASE_URL = `${PROTOCOL}://localhost:8081/api/`

export const defaultAxios = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	timeout: 10000,
})

defaultAxios.interceptors.response.use(
	(r) => r.data,
	(e) => e.response?.data || {state: false, data: null},
)
