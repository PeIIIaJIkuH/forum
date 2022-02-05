import React, {FC} from 'react'
import userState from '../../store/userState'
import Empty from 'antd/lib/empty'
import s from '../AdminDashboard/AdminDashboard.module.css'
import Card from 'antd/lib/card'
import {observer} from 'mobx-react-lite'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

export const DefaultNotifications: FC = observer(() => {
	return userState.defaultNotifications.length ? (
		<>
			{userState.defaultNotifications.map(({
				                                     id, postRating, postId,
				                                     commentRating, comment, createdAt,
			                                     }) => {
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
						<div className={s.wrapper}>
							<div className={s.createdAt}>{created}
							</div>
						</div>
					</div>
				)
			})}
		</>
	) : (
		<Card>
			<Empty className={s.empty} description='No Notifications'/>
		</Card>
	)
})
