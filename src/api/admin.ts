import {ApiPromise} from '../types'
import {defaultAxios} from './index'

const fetchModeratorRequests = (): ApiPromise => defaultAxios.get('admin/requests')

const acceptModeratorRequest = (requestId: number): ApiPromise => defaultAxios.put(`admin/request/accept/${requestId}`)

const dismissModeratorRequest = (requestId: number): ApiPromise => defaultAxios.delete(
	`admin/request/dismiss/${requestId}`)

const fetchPostReports = (): ApiPromise => defaultAxios.get('admin/post/reports')

const acceptPostReport = (reportId: number): ApiPromise => defaultAxios.put(`admin/post/report/accept/${reportId}`)

const dismissPostReport = (reportId: number): ApiPromise => defaultAxios.delete(
	`admin/post/report/dismiss/${reportId}`)

const deletePost = (postId: number): ApiPromise => defaultAxios.delete(`admin/post/delete/${postId}`)

const deleteComment = (commentId: number): ApiPromise => defaultAxios.delete(`admin/comment/delete/${commentId}`)

const fetchModerators = (): ApiPromise => defaultAxios.get('admin/moderators')

const demoteModerator = (moderatorId: number): ApiPromise => defaultAxios.put(`admin/demote/moderator/${moderatorId}`)

const fetchCategories = (): ApiPromise => defaultAxios.get('admin/categories')

const createCategory = (categoryName: string): ApiPromise => defaultAxios.post('admin/category/add', {
	name: categoryName,
})

const deleteCategory = (categoryId: number): ApiPromise => defaultAxios.delete(`admin/category/delete/${categoryId}`)

export const adminAPI = {
	fetchModeratorRequests,
	acceptModeratorRequest,
	dismissModeratorRequest,
	fetchPostReports,
	acceptPostReport,
	dismissPostReport,
	deletePost,
	deleteComment,
	fetchModerators,
	demoteModerator,
	fetchCategories,
	createCategory,
	deleteCategory,
}
