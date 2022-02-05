import React, {FC} from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import {CommentOutlined} from '@ant-design/icons'
import {IPost} from '../../../types'
import {useHistory} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

type Props = {
	post: IPost
}

export const Footer: FC<Props> = ({post}) => {
	const history = useHistory()
	const created = formatDistanceToNow(post.createdAt * 1000)

	const onClick = () => {
		history.push(`/user/${post.author.id}`)
	}

	return (
		<div className={s.footer}>
			<div className={s.author}>
				<Button className={s.user} type='text' onClick={onClick}>
					{post.author.username}
				</Button>
			</div>
			<div>{created}</div>
			<Button type='text' onClick={() => history.push(`/post/${post.id}`)}>
				<span>{post && post.commentsNumber}</span>
				<CommentOutlined/>
			</Button>
		</div>
	)
}
