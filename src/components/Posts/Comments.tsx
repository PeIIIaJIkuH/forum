import {EUserRole, IComment, IUser} from '../../types'

import {Comment} from './Comment'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import List from 'antd/lib/list'
import authState from '../../store/authState'
import {formatDistanceToNow} from 'date-fns'
import {observer} from 'mobx-react-lite'
import s from './Posts.module.css'

type Props = {
	comments: IComment[] | null
	userPage?: boolean
}

export const Comments: FC<Props> = observer(({comments, userPage}) => {
	const data = comments ? comments.map(comment => {
		const created = formatDistanceToNow(comment.createdAt * 1000)
		const isAuthor = comment.author.id === authState.user?.id

		return {
			author: comment.author,
			content: comment.content,
			datetime: created,
			comment: comment,
			isAuthor,
			isAdmin: authState.role === EUserRole.admin,
		}
	}) : undefined

	const header = (
		<div className={s.commentsTitle}>
			{`${comments ? comments.length : 'No'} comments`}
		</div>
	)

	type obj = {
		author: IUser
		content: string
		datetime: string
		comment: IComment
		isAuthor: boolean
		isAdmin: boolean
	}
	const renderItem = ({author, content, isAuthor, comment, datetime, isAdmin}: obj) => (
		<li>
			<Comment content={content} datetime={datetime} comment={comment} isAuthor={isAuthor} userPage={userPage}
				isAdmin={isAdmin} author={(
				<Link to={`/user/${author.id}`}>
					{author.username}
				</Link>
			)}
			/>
		</li>
	)

	return (
		<List header={!userPage ? header : null} dataSource={data} renderItem={renderItem}
			locale={{emptyText: 'No Comments'}}
		/>
	)
})
