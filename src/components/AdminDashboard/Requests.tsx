import React, {FC} from 'react'
import s from './AdminDashboard.module.css'
import adminState from '../../store/adminState'
import {Link} from 'react-router-dom'
import Button from 'antd/lib/button'
import {CheckOutlined, CloseOutlined} from '@ant-design/icons'
import {observer} from 'mobx-react-lite'
import {adminAPI} from '../../api/admin'
import message from 'antd/lib/message'
import Empty from 'antd/lib/empty'
import Card from 'antd/lib/card'
import appState from '../../store/appState'

export const Requests: FC = observer(() => {
	const onAccept = async (id: number) => {
		appState.setIsLoading(true)
		const {status} = await adminAPI.acceptModeratorRequest(id)
		appState.setIsLoading(false)
		if (status) {
			message.success('request was accepted successfully')
			adminState.setRequests([])
			adminState.setModerators([])
			await adminState.fetchRequests()
			await adminState.fetchModerators()
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
			adminState.setRequests([])
			await adminState.fetchRequests()
		} else {
			message.error('can not dismiss request')
		}
	}

	return adminState.requests.length ? (
		<div className={s.grid}>
			{adminState.requests.map(({id, user}) => (
				<div key={id} className={s.card}>
					<Link to={`/user/${user.id}`}>
						{user.username}
					</Link>
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
	)
})
