import {ApiPromise} from '../types'
import {updatingAxios} from './index'

const deletePost = (postId: number): ApiPromise => updatingAxios.delete(`moderator/post/delete/${postId}`)

const fetchReports = (): ApiPromise => updatingAxios.get('moderator/reports')

const createReport = (moderatorId: number, postId: number): ApiPromise => updatingAxios.post(
	'moderator/report/post/create', {
		moderatorId,
		postId,
	})

const deleteReport = (reportId: number): ApiPromise => updatingAxios.delete(`moderator/report/post/delete/${reportId}`)

export const moderatorAPI = {
	deletePost,
	fetchReports,
	createReport,
	deleteReport,
}
