import Button from 'antd/lib/button'
import Card from 'antd/lib/card'
import {DeleteOutlined} from '@ant-design/icons'
import Empty from 'antd/lib/empty'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {adminAPI} from '../../api/admin'
import adminState from '../../store/adminState'
import appState from '../../store/appState'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'
import s from './AdminDashboard.module.css'

export const Moderators: FC = observer(() => {
	const onDelete = async (id: number) => {
		appState.setIsLoading(true)
		const {status} = await adminAPI.demoteModerator(id)
		appState.setIsLoading(false)
		if (status) {
			message.success('moderator was demoted successfully')
			adminState.setModerators([])
			await adminState.fetchRequests()
		} else {
			message.error('can not demote moderator')
		}
	}

	return adminState.moderators.length ? (
		<div className={s.grid}>
			{adminState.moderators.map(({id, username}) => (
				<div key={id} className={s.card}>
					<Link to={`/user/${id}`}>{username}</Link>
					<div>
						<Button
							icon={<DeleteOutlined/>}
							danger
							className={s.close}
							type='link'
							onClick={onDelete.bind(null, id)}
							loading={appState.isLoading}
						/>
					</div>
				</div>
			))}
		</div>
	) : (
		<Card>
			<Empty className={s.empty} description='No Moderators'/>
		</Card>
	)
})
