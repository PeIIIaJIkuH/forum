import {FC} from 'react'
import {Link} from 'react-router-dom'
import appState from '../../store/appState'
import {formatDistanceToNow} from 'date-fns'
import {observer} from 'mobx-react-lite'
import s from './Notifications.module.css'
import {userAPI} from '../../api/user'
import userState from '../../store/userState'
import {Button, Empty, message} from 'antd'

export const DefaultNotifications: FC = observer(() => {
	const onDelete = async () => {
		appState.setIsLoading(true)
		const {status} = await userAPI.deleteDefaultNotifications()
		appState.setIsLoading(false)
		if (status) {
			userState.setDefaultNotifications([])
			message.success('default notifications were deleted successfully')
		} else {
			message.error('can not delete default notifications')
		}
	}

	return (
		<div className={s.wrapper}>
			{userState.defaultNotifications.length ? (
				<>
					<Button danger onClick={onDelete} loading={appState.isLoading} className={s.deleteButton}>
						Clear
					</Button>
					{userState.defaultNotifications.map(
						({id, postRating, postId, commentRating, comment, createdAt}) => {
							let username, userId, text, link
							if (postRating) {
								username = postRating.author.username
								userId = postRating.author.id
								text = postRating.rate === 1 ? 'upvoted' : 'downvoted'
								link = <Link to={`/post/${postId}`}>post</Link>
							} else if (commentRating) {
								username = commentRating.author.username
								userId = commentRating.author.id
								text = commentRating.rate === 1 ? 'upvoted' : 'downvoted'
								link = <Link to={`/post/${comment.postId}`}>comment</Link>
							} else if (comment) {
								username = comment.author.username
								userId = comment.author.id
								text = 'commented'
								link = <Link to={`/post/${postId}`}>post</Link>
							} else {
								text = 'error'
							}
							const created = formatDistanceToNow(createdAt * 1000)

							return (
								<div key={id} className={s.notification}>
									<div>
										<Link to={`/user/${userId}`}>{username}</Link> {text} your {link}
									</div>
									<div className={s.createdAt}>{created}</div>
								</div>
							)
						})}
				</>
			) : (
				<Empty description='No Notifications'/>
			)}
		</div>
	)
})
