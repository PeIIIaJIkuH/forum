import Button from 'antd/lib/button'
import Empty from 'antd/lib/empty'
import {FC} from 'react'
import appState from '../../store/appState'
import {formatDistanceToNow} from 'date-fns'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'
import s from './Notifications.module.css'
import {userAPI} from '../../api/user'
import userState from '../../store/userState'

export const RoleNotifications: FC = observer(() => {
	const onDelete = async () => {
		appState.setIsLoading(true)
		const {status} = await userAPI.deleteRoleNotifications()
		appState.setIsLoading(false)
		if (status) {
			userState.setRoleNotifications([])
			message.success('role notifications were deleted successfully')
		} else {
			message.error('can not role post notifications')
		}
	}

	return (
		<div className={s.wrapper}>
			{userState.roleNotifications.length ? (
				<>
					<Button danger onClick={onDelete} loading={appState.isLoading} className={s.deleteButton}>
						Clear
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
								<div className={s.createdAt}>{created}</div>
							</div>
						)
					})}
				</>
			) : (
				<Empty description='No Notifications'/>
			)}
		</div>
	)
})
