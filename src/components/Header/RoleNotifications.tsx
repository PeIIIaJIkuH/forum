import React, {FC} from 'react'
import userState from '../../store/userState'
import Empty from 'antd/lib/empty'
import s from '../AdminDashboard/AdminDashboard.module.css'
import Card from 'antd/lib/card'
import {observer} from 'mobx-react-lite'
import {formatDistanceToNow} from 'date-fns'
import appState from '../../store/appState'
import {userAPI} from '../../api/user'
import message from 'antd/lib/message'
import Button from 'antd/lib/button'

export const RoleNotifications: FC = observer(() => {
	const onDelete = async () => {
		appState.setIsLoading(true)
		const {status} = await userAPI.deleteRoleNotifications()
		appState.setIsLoading(false)
		if (status) {
			message.success('role notifications were deleted successfully')
		} else {
			message.error('can not role post notifications')
		}
	}

	return userState.roleNotifications.length ? (
		<>
			<Button danger onClick={onDelete} loading={appState.isLoading} type='link' className={s.deleteButton}>
				Delete
			</Button>
			{userState.roleNotifications.map(({id, accepted, declined, demoted, createdAt}) => {
				let text
				if (accepted) {
					text = 'Your promotion to moderator was accepted'
				} else if (declined) {
					text = 'Your promotion to moderator was declined'
				} else if (demoted) {
					text = 'You were demoted from moderators'
				} else {
					text = 'error'
				}
				const created = formatDistanceToNow(createdAt * 1000)

				return (
					<div key={id} className={s.notification}>
						<div>{text}</div>
						<div className={s.wrapper}>
							<div className={s.createdAt}>{created}</div>
						</div>
					</div>
				)
			})}
		</>
	) : (
		<Card>
			<Empty className={s.empty} description='No Notifications'/>
		</Card>
	)
})
