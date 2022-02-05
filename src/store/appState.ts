import {makeAutoObservable} from 'mobx'
import authState from './authState'

class AppState {
	initialized: boolean
	isLoading: boolean
	url: string
	isMenuOpen: boolean

	constructor() {
		makeAutoObservable(this)
		this.initialized = false
		this.isLoading = false
		this.url = ''
		this.isMenuOpen = false
	}

	setInitialized(initialized: boolean) {
		this.initialized = initialized
	}

	setUrl(url: string) {
		this.url = url
	}

	setIsLoading(loading: boolean) {
		this.isLoading = loading
	}

	setIsMenuOpen(isOpen: boolean) {
		const htmlElement = document.getElementsByTagName('html')[0]
		if (!isOpen) {
			htmlElement.style.overflowY = 'scroll'
		} else {
			htmlElement.style.overflowY = 'hidden'
		}
		this.isMenuOpen = isOpen
	}

	async initialize() {
		await authState.fetchUserData()
		this.setInitialized(true)
	}
}

export default new AppState()
