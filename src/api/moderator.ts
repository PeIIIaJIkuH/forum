import {ApiPromise} from '../types'
import {defaultAxios} from './index'

const deletePost = (postId: number): ApiPromise => defaultAxios.delete(`moderator/post/delete/${postId}`)

const fetchReports = (): ApiPromise => defaultAxios.get('moderator/reports')

const createReport = (moderatorId: number, postId: number): ApiPromise => defaultAxios.post(
	'moderator/report/post/create', {
		moderatorId,
		postId,
	})

const deleteReport = (reportId: number): ApiPromise => defaultAxios.delete(`moderator/report/post/delete/${reportId}`)

export const moderatorAPI = {
	deletePost,
	fetchReports,
	createReport,
	deleteReport,
}
