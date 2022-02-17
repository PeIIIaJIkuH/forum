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

export const ReportNotifications: FC = observer(() => {
	const onDelete = async () => {
		appState.setIsLoading(true)
		const {status} = await userAPI.deleteReportNotifications()
		appState.setIsLoading(false)
		if (status) {
			userState.setReportNotifications([])
			message.success('report notifications were deleted successfully')
		} else {
			message.error('can not delete report notifications')
		}
	}

	return userState.reportNotifications.length ? (
		<>
			<Button danger onClick={onDelete} loading={appState.isLoading} type='link' className={s.deleteButton}>
				Delete
			</Button>
			{userState.reportNotifications.map(({id, approved, deleted, createdAt}) => {
				let text
				if (approved) {
					text = 'Your post report was approved'
				} else if (deleted) {
					text = 'Your post report was declined'
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
