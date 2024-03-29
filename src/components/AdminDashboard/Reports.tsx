import {CheckOutlined, CloseOutlined, LoadingOutlined} from '@ant-design/icons'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {adminAPI} from '../../api/admin'
import adminState from '../../store/adminState'
import appState from '../../store/appState'
import {observer} from 'mobx-react-lite'
import s from './AdminDashboard.module.css'
import {Button, Card, Empty, message, Spin} from 'antd'

export const Reports: FC = observer(() => {
	const onAccept = async (id: number) => {
		appState.setIsLoading(true)
		const {status} = await adminAPI.acceptPostReport(id)
		appState.setIsLoading(false)
		if (status) {
			message.success('report was accepted successfully')
			adminState.deleteReport(id)
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
			adminState.deleteReport(id)
		} else {
			message.error('can not dismiss report')
		}
	}

	return (
		<Spin spinning={appState.isLoading} indicator={<LoadingOutlined className={s.spinnerIcon}/>}>
			{adminState.reports.length ? (
				<div className={s.grid}>
					{adminState.reports.map(({id, postTitle, postId}) => (
						<div key={id} className={s.card}>
							<Link to={`/post/${postId}`}>{postTitle}</Link>
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
			)}
		</Spin>
	)
})
