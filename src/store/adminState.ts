import {makeAutoObservable} from 'mobx'
import {adminAPI} from '../api/admin'
import authState from './authState'
import {EUserRole, ICategory, IPostReport, IRoleRequest, IUser} from '../types'
import appState from './appState'

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
		appState.setIsLoading(true)
		const {data, status} = await adminAPI.fetchModeratorRequests()
		appState.setIsLoading(false)
		if (status) {
			this.setRequests(data)
		}
	}

	async fetchReports() {
		if (!authState.user || authState.role !== EUserRole.admin) {
			return
		}
		appState.setIsLoading(true)
		const {data, status} = await adminAPI.fetchPostReports()
		appState.setIsLoading(false)
		if (status) {
			this.setReports(data)
		}
	}

	async fetchModerators() {
		if (!authState.user || authState.role !== EUserRole.admin) {
			return
		}
		appState.setIsLoading(true)
		const {data, status} = await adminAPI.fetchModerators()
		appState.setIsLoading(false)
		if (status) {
			this.setModerators(data)
		}
	}

	async fetchCategories() {
		if (!authState.user || authState.role !== EUserRole.admin) {
			return
		}
		appState.setIsLoading(true)
		const {data, status} = await adminAPI.fetchCategories()
		appState.setIsLoading(false)
		if (status) {
			this.setCategories(data)
		}
	}
}

export default new AdminState()
