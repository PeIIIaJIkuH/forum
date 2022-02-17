import {IDefaultNotification, IPostNotification, IReportNotification, IRoleNotification, IUser} from '../types'

import appState from './appState'
import {makeAutoObservable} from 'mobx'
import {userAPI} from '../api/user'

class UserState {
	user: IUser | null
	defaultNotifications: IDefaultNotification[]
	roleNotifications: IRoleNotification[]
	reportNotifications: IReportNotification[]
	postNotifications: IPostNotification[]

	constructor() {
		makeAutoObservable(this)
		this.user = null
		this.defaultNotifications = []
		this.roleNotifications = []
		this.reportNotifications = []
		this.postNotifications = []
	}

	setUser(user: IUser | null) {
		this.user = user
	}

	setDefaultNotifications(notifications: IDefaultNotification[] | null) {
		this.defaultNotifications = notifications || []
	}

	setRoleNotifications(notifications: IRoleNotification[] | null) {
		this.roleNotifications = notifications || []
	}

	setReportNotifications(notifications: IReportNotification[] | null) {
		this.reportNotifications = notifications || []
	}

	setPostNotifications(notifications: IPostNotification[] | null) {
		this.postNotifications = notifications || []
	}

	async fetchUser(userId: number) {
		appState.setIsLoading(true)
		const {data, status} = await userAPI.fetchUser(userId)
		appState.setIsLoading(false)
		if (status) {
			this.setUser(data)
		}
		return status
	}

	getNotificationsCount() {
		return (
			this.defaultNotifications.length +
			this.roleNotifications.length +
			this.reportNotifications.length +
			this.postNotifications.length
		)
	}

	async fetchAllNotifications() {
		appState.setIsLoading(true)
		const [
			{data: data1, status: status1},
			{data: data2, status: status2},
			{data: data3, status: status3},
			{data: data4, status: status4},
		] = await Promise.all([
			userAPI.fetchDefaultNotifications(),
			userAPI.fetchRoleNotifications(),
			userAPI.fetchReportNotifications(),
			userAPI.fetchPostNotifications(),
		])
		appState.setIsLoading(false)
		if (status1) {
			this.setDefaultNotifications(data1)
		}
		if (status2) {
			this.setRoleNotifications(data2)
		}
		if (status3) {
			this.setReportNotifications(data3)
		}
		if (status4) {
			this.setPostNotifications(data4)
		}
	}

	async deleteAllNotifications() {
		appState.setIsLoading(true)
		const [{status: status1}, {status: status2}, {status: status3}, {status: status4}] = await Promise.all([
			userAPI.deleteDefaultNotifications(),
			userAPI.deleteRoleNotifications(),
			userAPI.deleteReportNotifications(),
			userAPI.deletePostNotifications(),
		])
		appState.setIsLoading(false)
		if (status1) {
			this.setDefaultNotifications([])
		}
		if (status2) {
			this.setRoleNotifications([])
		}
		if (status3) {
			this.setReportNotifications([])
		}
		if (status4) {
			this.setPostNotifications([])
		}
		return status1 && status2 && status3 && status4
	}
}

export default new UserState()
