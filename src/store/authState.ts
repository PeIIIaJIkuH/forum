import {EUserRole, IUser} from '../types'
import {makeAutoObservable} from 'mobx'
import appState from './appState'
import {authAPI} from '../api/auth'
import userState from './userState'

class AuthState {
	user: IUser | null
	role: EUserRole
	moderatorRequest: -1 | 0 | 1

	constructor() {
		makeAutoObservable(this)
		this.user = null
		this.role = EUserRole.guest
		this.moderatorRequest = -1
	}

	setUser(user: IUser | null) {
		this.user = user
	}

	setRole(role: EUserRole) {
		this.role = role
	}

	setModeratorRequest(pending: -1 | 0 | 1) {
		this.moderatorRequest = pending
	}

	async fetchUserData() {
		appState.setIsLoading(true)
		const {data, status} = await authAPI.me()
		appState.setIsLoading(false)
		if (status) {
			const {id, username, email, createdAt, lastActive, role} = data
			this.setUser({id, username, email, createdAt, lastActive})
			this.setRole(role)
		} else {
			this.setUser(null)
			this.setRole(EUserRole.guest)
		}
	}

	async signUp(username: string, email: string, password: string, adminToken: string, asModerator: boolean) {
		appState.setIsLoading(true)
		const {status} = await authAPI.signUp(username, email, password, adminToken, asModerator)
		appState.setIsLoading(false)
		return status
	}

	async signIn(username: string, password: string) {
		appState.setIsLoading(true)
		const {status} = await authAPI.signIn(username, password)
		if (status) {
			await this.fetchUserData()
		}
		appState.setIsLoading(false)
		return status
	}

	async signOut() {
		appState.setIsLoading(true)
		const {status} = await authAPI.signOut()
		appState.setIsLoading(false)
		if (status) {
			this.setUser(null)
			this.setRole(EUserRole.guest)
			userState.setDefaultNotifications([])
		}
		return status
	}
}

export default new AuthState()
