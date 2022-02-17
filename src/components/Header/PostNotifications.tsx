import Button from 'antd/lib/button'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import {FC} from 'react'
import appState from '../../store/appState'
import {formatDistanceToNow} from 'date-fns'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'
import s from '../AdminDashboard/AdminDashboard.module.css'
import {userAPI} from '../../api/user'
import userState from '../../store/userState'

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

	return userState.postNotifications.length ? (
		<>
			<Button danger onClick={onDelete} loading={appState.isLoading} type='link' className={s.deleteButton}>
				Delete
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
