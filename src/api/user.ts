import {ApiPromise} from '../types'
import {updatingAxios} from './index'

const fetchUser = (userId: number): ApiPromise => updatingAxios.get(`user/${userId}`)

const fetchDefaultNotifications = (): ApiPromise => updatingAxios.get('notifications')

const deleteDefaultNotifications = (): ApiPromise => updatingAxios.delete('notifications/delete')

const requestPromotionToModerator = (): ApiPromise => updatingAxios.post('request/add')

const deleteRequestPromotionToModerator = (): ApiPromise => updatingAxios.delete('request/delete')

const getRequestPromotionToModerator = (): ApiPromise => updatingAxios.get('request')

const fetchRoleNotifications = (): ApiPromise => updatingAxios.get('user/notifications/role')

const deleteRoleNotifications = (): ApiPromise => updatingAxios.delete('user/notifications/role/delete')

const fetchReportNotifications = (): ApiPromise => updatingAxios.get('user/notifications/report')

const deleteReportNotifications = (): ApiPromise => updatingAxios.delete('user/notifications/report/delete')

const fetchPostNotifications = (): ApiPromise => updatingAxios.get('user/notifications/post')

const deletePostNotifications = (): ApiPromise => updatingAxios.delete('user/notifications/post/delete')

export const userAPI = {
	fetchUser,
	fetchDefaultNotifications,
	deleteDefaultNotifications,
	requestPromotionToModerator,
	deleteRequestPromotionToModerator,
	getRequestPromotionToModerator,
	fetchRoleNotifications,
	deleteRoleNotifications,
	fetchReportNotifications,
	deleteReportNotifications,
	fetchPostNotifications,
	deletePostNotifications,
}
