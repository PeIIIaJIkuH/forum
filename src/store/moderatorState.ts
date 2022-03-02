import {makeAutoObservable} from 'mobx'
import {IPostReport} from '../types'
import appState from './appState'
import {moderatorAPI} from '../api/moderator'

class ModeratorState {
	reports: IPostReport[]
	reportIds: Map<number, number>

	constructor() {
		makeAutoObservable(this)
		this.reports = []
		this.reportIds = new Map()
	}

	setReports(reports: IPostReport[] | null) {
		this.reports = []
		this.reportIds.clear()
		for (const report of reports || []) {
			this.reports.push(report)
			this.reportIds.set(report.postId, report.id)
		}
	}

	async fetchModeratorReports() {
		appState.setIsLoading(true)
		const {data, status} = await moderatorAPI.fetchReports()
		appState.setIsLoading(false)
		if (status) {
			this.setReports(data)
		}
	}
}

export default new ModeratorState()
