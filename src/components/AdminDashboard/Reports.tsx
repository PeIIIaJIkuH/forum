import React, {FC} from 'react'
import s from './AdminDashboard.module.css'
import adminState from '../../store/adminState'
import {Link} from 'react-router-dom'
import Button from 'antd/lib/button'
import {CheckOutlined, CloseOutlined} from '@ant-design/icons'
import {adminAPI} from '../../api/admin'
import message from 'antd/lib/message'
import Empty from 'antd/lib/empty'
import Card from 'antd/lib/card'
import appState from '../../store/appState'

export const Reports: FC = () => {
	const onAccept = async (id: number) => {
		appState.setIsLoading(true)
		const {status} = await adminAPI.acceptPostReport(id)
		appState.setIsLoading(false)
		if (status) {
			message.success('report was accepted successfully')
			adminState.setReports([])
			await adminState.fetchReports()
		} else {
			message.error('can not accept report')
		}
	}

	const onDismiss = async (id: number) => {
		appState.setIsLoading(true)
		const {status} = await adminAPI.dismissPostReport(id)
		appState.setIsLoading(false)
		if (status) {
			message.success('report was dismissed successfully')
			adminState.setReports([])
			await adminState.fetchReports()
		} else {
			message.error('can not dismiss report')
		}
	}

	return adminState.reports.length ? (
		<div className={s.grid}>
			{adminState.reports.map(({id, postTitle, postId}) => (
				<div key={id} className={s.card}>
					<Link to={`/post/${postId}`}>
						{postTitle}
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
			<Empty className={s.empty} description='No Reports'/>
		</Card>
	)
}
