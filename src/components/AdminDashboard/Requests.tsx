import {CheckOutlined, CloseOutlined, LoadingOutlined} from '@ant-design/icons'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {adminAPI} from '../../api/admin'
import adminState from '../../store/adminState'
import appState from '../../store/appState'
import {observer} from 'mobx-react-lite'
import s from './AdminDashboard.module.css'
import {Button, Card, Empty, message, Spin} from 'antd'

export const Requests: FC = observer(() => {
	const onAccept = async (id: number) => {
		appState.setIsLoading(true)
		const {status} = await adminAPI.acceptModeratorRequest(id)
		appState.setIsLoading(false)
		if (status) {
			message.success('request was accepted successfully')
			adminState.deleteRequest(id)
		} else {
			message.error('can not accept request')
		}
	}

	const onDismiss = async (id: number) => {
		appState.setIsLoading(true)
		const {status} = await adminAPI.dismissModeratorRequest(id)
		appState.setIsLoading(false)
		if (status) {
			message.success('request was dismissed successfully')
			adminState.deleteRequest(id)
		} else {
			message.error('can not dismiss request')
		}
	}

	return (
		<Spin spinning={appState.isLoading} indicator={<LoadingOutlined className={s.spinnerIcon}/>}>
			{adminState.requests.length ? (
				<div className={s.grid}>
					{adminState.requests.map(({id, user}) => (
						<div key={id} className={s.card}>
							<Link to={`/user/${user.id}`}>{user.username}</Link>
							<div>
								<Button icon={<CloseOutlined/>} danger className={s.close} type='link'
									onClick={onDismiss.bind(null, id)} loading={appState.isLoading}
								/>
								<Button icon={<CheckOutlined/>} type='link' onClick={onAccept.bind(null, id)}
									loading={appState.isLoading}
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				<Card>
					<Empty className={s.empty} description='No Requests'/>
				</Card>
			)}
		</Spin>
	)
})
