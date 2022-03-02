import {FC} from 'react'
import appState from '../../store/appState'
import {formatDistanceToNow} from 'date-fns'
import {observer} from 'mobx-react-lite'
import s from './Notifications.module.css'
import {userAPI} from '../../api/user'
import userState from '../../store/userState'
import {Button, Empty, message} from 'antd'

export const PostNotifications: FC = observer(() => {
	const onDelete = async () => {
		appState.setIsLoading(true)
		const {status} = await userAPI.deletePostNotifications()
		appState.setIsLoading(false)
		if (status) {
			userState.setPostNotifications([])
			message.success('post notifications were deleted successfully')
		} else {
			message.error('can not delete post notifications')
		}
	}

	return (
		<div className={s.wrapper}>
			{userState.postNotifications.length ? (
				<>
					<Button danger onClick={onDelete} loading={appState.isLoading} className={s.deleteButton}>
						Clear
					</Button>
					{userState.postNotifications.map(({id, deleted, createdAt}) => {
						let text
						if (deleted) {
							text = 'Your post was deleted'
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
