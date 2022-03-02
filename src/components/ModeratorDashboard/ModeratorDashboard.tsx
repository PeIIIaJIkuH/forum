import {DeleteOutlined, LoadingOutlined} from '@ant-design/icons'
import {EUserRole} from '../../types'
import {Error403} from '../common/errors/Error403'
import {FC} from 'react'
import {Helmet} from 'react-helmet'
import {Link} from 'react-router-dom'
import appState from '../../store/appState'
import authState from '../../store/authState'
import {moderatorAPI} from '../../api/moderator'
import moderatorState from '../../store/moderatorState'
import {observer} from 'mobx-react-lite'
import s from './ModeratorDashboard.module.css'
import {Button, Card, Empty, message, Spin} from 'antd'

export const ModeratorDashboard: FC = observer(() => {
	if (!authState.user || authState.role !== EUserRole.moderator) {
		return <Error403/>
	}

	const onDelete = async (id: number) => {
		appState.setIsLoading(true)
		const {status} = await moderatorAPI.deleteReport(id)
		appState.setIsLoading(false)
		if (status) {
			message.success('post report was deleted successfully')
			await moderatorState.fetchModeratorReports()
		} else {
			message.error('can not delete post report')
		}
	}

	return (
		<>
			<Helmet>
				<title>Moderator Dashboard | forume</title>
			</Helmet>
			<h2>Reports</h2>
			<Spin spinning={appState.isLoading} indicator={<LoadingOutlined className={s.spinnerIcon}/>}>
				{moderatorState.reports.length ? (
					<div className={s.grid}>
						{moderatorState.reports.map(({id, postTitle, postId}) => (
							<div key={id} className={s.card}>
								<Link to={`/post/${postId}`}>
									{postTitle}
								</Link>
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
						<Empty className={s.empty} description='No Reports'/>
					</Card>
				)}
			</Spin>
		</>
	)
})
