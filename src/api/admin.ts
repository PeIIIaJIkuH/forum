import {ApiPromise} from '../types'
import {defaultAxios, updatingAxios} from './index'

const fetchModeratorRequests = (): ApiPromise => updatingAxios.get('admin/requests')

const acceptModeratorRequest = (requestId: number): ApiPromise => updatingAxios.put(`admin/request/accept/${requestId}`)

const dismissModeratorRequest = (requestId: number): ApiPromise => updatingAxios.delete(
	`admin/request/dismiss/${requestId}`)

const fetchPostReports = (): ApiPromise => updatingAxios.get('admin/post/reports')

const acceptPostReport = (reportId: number): ApiPromise => updatingAxios.put(`admin/post/report/accept/${reportId}`)

const dismissPostReport = (reportId: number): ApiPromise => updatingAxios.delete(
	`admin/post/report/dismiss/${reportId}`)

const deletePost = (postId: number): ApiPromise => updatingAxios.delete(`admin/post/delete/${postId}`)

const deleteComment = (commentId: number): ApiPromise => updatingAxios.delete(`admin/comment/delete/${commentId}`)

const fetchModerators = (): ApiPromise => updatingAxios.get('admin/moderators')

const demoteModerator = (moderatorId: number): ApiPromise => updatingAxios.put(`admin/demote/moderator/${moderatorId}`)

const fetchCategories = (): ApiPromise => defaultAxios.get('admin/categories')

const createCategory = (categoryName: string): ApiPromise => updatingAxios.post('admin/category/add', {
	name: categoryName,
})

const deleteCategory = (categoryId: number): ApiPromise => updatingAxios.delete(`admin/category/delete/${categoryId}`)

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
