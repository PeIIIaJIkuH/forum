import React, {FC} from 'react'
import {Helmet} from 'react-helmet'
import authState from '../../store/authState'
import {Error403} from '../common/errors/Error403'
import {observer} from 'mobx-react-lite'
import {EUserRole} from '../../types'
import s from './ModeratorDashboard.module.css'
import moderatorState from '../../store/moderatorState'
import {Link} from 'react-router-dom'
import {DeleteOutlined} from '@ant-design/icons'
import Button from 'antd/lib/button'
import appState from '../../store/appState'
import {moderatorAPI} from '../../api/moderator'
import message from 'antd/lib/message'
import Empty from 'antd/lib/empty'
import Card from 'antd/lib/card'

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
			<Helmet><title>Moderator Dashboard | forume</title></Helmet>
			<h2>Reports</h2>
			{moderatorState.reports.length ? (
				<div className={s.grid}>
					{moderatorState.reports.map(({id, postTitle, postId}) => (
						<div key={id} className={s.card}>
							<Link to={`/post/${postId}`}>
								{postTitle}
							</Link>
							<div>
								<Button icon={<DeleteOutlined/>} danger className={s.close} type='link'
								        onClick={onDelete.bind(null, id)}
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
		</>
	)
})
