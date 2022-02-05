import axios from 'axios'
import authState from '../store/authState'

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

export const updatingAxios = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	timeout: 10000,
})

updatingAxios.interceptors.response.use(
	async (r) => {
		await authState.fetchUserData()
		return r.data
	},
	(e) => e.response?.data || {state: false, data: null},
)
