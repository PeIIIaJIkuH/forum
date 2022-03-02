import {DeleteOutlined, LoadingOutlined} from '@ant-design/icons'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {adminAPI} from '../../api/admin'
import adminState from '../../store/adminState'
import appState from '../../store/appState'
import {observer} from 'mobx-react-lite'
import s from './AdminDashboard.module.css'
import {Button, Card, Empty, message, Spin} from 'antd'

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

	return (
		<Spin spinning={appState.isLoading} indicator={<LoadingOutlined className={s.spinnerIcon}/>}>
			{adminState.moderators.length ? (
				<div className={s.grid}>
					{adminState.moderators.map(({id, username}) => (
						<div key={id} className={s.card}>
							<Link to={`/user/${id}`}>{username}</Link>
							<div>
								<Button icon={<DeleteOutlined/>} danger className={s.close} type='link'
									onClick={onDelete.bind(null, id)} loading={appState.isLoading}
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				<Card>
					<Empty className={s.empty} description='No Moderators'/>
				</Card>
			)}
		</Spin>
	)
})
