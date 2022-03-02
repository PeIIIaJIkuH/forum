import {
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
	IssuesCloseOutlined,
	MoreOutlined,
} from '@ant-design/icons'
import {EUserRole, IPost} from '../../../types'
import {FC, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {adminAPI} from '../../../api/admin'
import appState from '../../../store/appState'
import authState from '../../../store/authState'
import {moderatorAPI} from '../../../api/moderator'
import moderatorState from '../../../store/moderatorState'
import {observer} from 'mobx-react-lite'
import postsState from '../../../store/postsState'
import s from '../Posts.module.css'
import {Button, message, Popover} from 'antd'

type Props = {
	post: IPost
}

export const Header: FC<Props> = observer(({post}) => {
	const history = useHistory()
	const [visible, setVisible] = useState(false)
	const isAuthor = authState.user?.id === post.author.id
	const isModerator = authState.role === EUserRole.moderator
	const isAdmin = authState.role === EUserRole.admin

	const onEdit = async () => {
		setVisible(false)
		history.push(`/edit?id=${post.id}`)
	}

	const onDelete = async (type: 'author' | 'moderator' | 'admin') => {
		setVisible(false)
		let status: boolean
		appState.setIsLoading(true)
		if (type === 'author') {
			status = await postsState.deletePost(post.id)
		} else if (type === 'moderator') {
			status = (await moderatorAPI.deletePost(post.id)).status
		} else {
			status = (await adminAPI.deletePost(post.id)).status
		}
		appState.setIsLoading(false)
		if (status) {
			message.success('post was deleted successfully')
			await postsState.fetchAllPosts()
		} else {
			message.error('can not delete post')
		}
	}

	const onCreateReport = async () => {
		setVisible(false)
		appState.setIsLoading(true)
		const {status} = await moderatorAPI.createReport(authState.user?.id!, post.id)
		appState.setIsLoading(false)
		if (status) {
			message.success('post was reported successfully')
			await moderatorState.fetchModeratorReports()
		} else {
			message.error('can not report post')
		}
	}

	const onDeleteReport = async () => {
		setVisible(false)
		const reportId = moderatorState.reportIds.get(post.id)
		if (!reportId) {
			return
		}
		appState.setIsLoading(true)
		const {status} = await moderatorAPI.deleteReport(reportId)
		appState.setIsLoading(false)
		if (status) {
			message.success('post report was deleted successfully')
			await moderatorState.fetchModeratorReports()
		} else {
			message.error('can not delete post report')
		}
	}

	const handleVisibleChange = (visible: boolean) => {
		setVisible(visible)
	}

	const content = (
		<div className={s.actions}>
			{isAuthor ? (
				<>
					<Button type='text' icon={<EditOutlined/>} onClick={onEdit}/>
					<Button danger type='link' icon={<DeleteOutlined/>} loading={appState.isLoading}
						onClick={onDelete.bind(null, 'author')}
					/>
				</>
			) : isModerator ? (
				<>
					<Button danger type='link' icon={<DeleteOutlined/>} loading={appState.isLoading}
						onClick={onDelete.bind(null, 'moderator')}
					/>
					{moderatorState.reportIds.has(post.id) ? (
						<Button type='link' icon={<IssuesCloseOutlined/>} loading={appState.isLoading}
							onClick={onDeleteReport}
						/>
					) : (
						<Button danger type='link' icon={<ExclamationCircleOutlined/>} loading={appState.isLoading}
							onClick={onCreateReport}
						/>
					)}
				</>
			) : isAdmin ? (
				<Button danger type='link' icon={<DeleteOutlined/>} loading={appState.isLoading}
					onClick={onDelete.bind(null, 'admin')}
				/>
			) : null}
		</div>
	)

	return (
		<div className={s.header}>
			<Link className={s.title} to={`/post/${post.id}`}>
				{post.title}
			</Link>
			{(isAuthor || isAdmin || isModerator) && (
				<div className={s.more}>
					<Popover trigger='click' placement='left' visible={visible} onVisibleChange={handleVisibleChange}
						content={content}
					>
						<Button type='text' icon={<MoreOutlined/>}/>
					</Popover>
				</div>
			)}
		</div>
	)
})
