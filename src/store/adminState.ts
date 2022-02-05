import {makeAutoObservable} from 'mobx'
import {adminAPI} from '../api/admin'
import authState from './authState'
import {EUserRole, ICategory, IPostReport, IRoleRequest, IUser} from '../types'

class AdminState {
	requests: IRoleRequest[]
	reports: IPostReport[]
	moderators: IUser[]
	categories: ICategory[]

	constructor() {
		makeAutoObservable(this)
		this.requests = []
		this.reports = []
		this.moderators = []
		this.categories = []
	}

	setRequests(requests: IRoleRequest[] | null) {
		this.requests = requests || []
	}

	setReports(reports: IPostReport[] | null) {
		this.reports = reports || []
	}

	setModerators(moderators: IUser[] | null) {
		this.moderators = moderators || []
	}

	setCategories(categories: ICategory[] | null) {
		this.categories = categories || []
	}

	async fetchRequests() {
		if (!authState.user || authState.role !== EUserRole.admin) {
			return
		}
		const {data, status} = await adminAPI.fetchModeratorRequests()
		if (status) {
			this.setRequests(data)
		}
	}

	async fetchReports() {
		if (!authState.user || authState.role !== EUserRole.admin) {
			return
		}
		const {data, status} = await adminAPI.fetchPostReports()
		if (status) {
			this.setReports(data)
		}
	}

	async fetchModerators() {
		if (!authState.user || authState.role !== EUserRole.admin) {
			return
		}
		const {data, status} = await adminAPI.fetchModerators()
		if (status) {
			this.setModerators(data)
		}
	}

	async fetchCategories() {
		if (!authState.user || authState.role !== EUserRole.admin) {
			return
		}
		const {data, status} = await adminAPI.fetchCategories()
		if (status) {
			this.setCategories(data)
		}
	}

	async fetchAll() {
		await Promise.all([this.fetchRequests(), this.fetchReports(), this.fetchModerators(), this.fetchCategories()])
	}
}

export default new AdminState()
