import {FC, useEffect} from 'react'
import {EUserRole} from '../../types'
import appState from '../../store/appState'
import authState from '../../store/authState'
import {formatDistanceToNow} from 'date-fns'
import {observer} from 'mobx-react-lite'
import s from './User.module.css'
import {userAPI} from '../../api/user'
import userState from '../../store/userState'
import {Button, Card, Descriptions, Typography} from 'antd'

export const UserInfo: FC = observer(() => {
	const user = userState.user
	const isUser = authState.role === EUserRole.user
	let lastActive
	if (user) {
		lastActive = formatDistanceToNow(user.lastActive * 1000)
	}

	const created = formatDistanceToNow(Number(user?.createdAt) * 1000)
	const request = authState.moderatorRequest

	const onRequest = async () => {
		appState.setIsLoading(true)
		const {status} = await userAPI.requestPromotionToModerator()
		appState.setIsLoading(false)
		if (status) {
			authState.setModeratorRequest(0)
		}
	}

	const onDeleteRequest = async () => {
		appState.setIsLoading(true)
		const {status} = await userAPI.deleteRequestPromotionToModerator()
		appState.setIsLoading(false)
		if (status) {
			authState.setModeratorRequest(-1)
		}
	}

	useEffect(() => {
		const f = async () => {
			try {
				appState.setIsLoading(true)
				const {data} = await userAPI.getRequestPromotionToModerator()
				authState.setModeratorRequest(data.pending ? 1 : 0)
			} catch (e) {
				authState.setModeratorRequest(-1)
			} finally {
				appState.setIsLoading(false)
			}
		}
		if (isUser) {
			f().then()
		}
	}, [isUser])

	return (
		user && (
			<section className={s.userInfo}>
				<Card title={<Typography.Title level={2}>{user.username}</Typography.Title>}>
					<Descriptions title='User info' column={1}>
						<Descriptions.Item label='E-mail'>{user.username}</Descriptions.Item>
						<Descriptions.Item label='Created at'>{created}</Descriptions.Item>
						<Descriptions.Item label='Last active'>{lastActive}</Descriptions.Item>
					</Descriptions>
					{isUser && request === -1 && (
						<Button onClick={onRequest} loading={appState.isLoading}>
							Request promotion to moderator
						</Button>
					)}
					{isUser && request !== -1 && (
						<Button onClick={onDeleteRequest} danger loading={appState.isLoading}>
							Delete your request to moderator
						</Button>
					)}
				</Card>
			</section>
		)
	)
})
