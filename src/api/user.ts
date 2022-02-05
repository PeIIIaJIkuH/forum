import {ApiPromise} from '../types'
import {defaultAxios} from './index'

const fetchUser = (userId: number): ApiPromise => defaultAxios.get(`user/${userId}`)

const fetchDefaultNotifications = (): ApiPromise => defaultAxios.get('notifications')

const deleteDefaultNotifications = (): ApiPromise => defaultAxios.delete('notifications/delete')

const requestPromotionToModerator = (): ApiPromise => defaultAxios.post('request/add')

const deleteRequestPromotionToModerator = (): ApiPromise => defaultAxios.delete('request/delete')

const getRequestPromotionToModerator = (): ApiPromise => defaultAxios.get('request')

const fetchRoleNotifications = (): ApiPromise => defaultAxios.get('user/notifications/role')

const deleteRoleNotifications = (): ApiPromise => defaultAxios.delete('user/notifications/role/delete')

const fetchReportNotifications = (): ApiPromise => defaultAxios.get('user/notifications/report')

const deleteReportNotifications = (): ApiPromise => defaultAxios.delete('user/notifications/report/delete')

const fetchPostNotifications = (): ApiPromise => defaultAxios.get('user/notifications/post')

const deletePostNotifications = (): ApiPromise => defaultAxios.delete('user/notifications/post/delete')

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
