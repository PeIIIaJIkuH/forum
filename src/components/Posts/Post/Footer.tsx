import {CommentOutlined} from '@ant-design/icons'
import {FC} from 'react'
import {IPost} from '../../../types'
import {formatDistanceToNow} from 'date-fns'
import s from '../Posts.module.css'
import {useHistory} from 'react-router-dom'
import {Button} from 'antd'

type Props = {
	post: IPost
}

export const Footer: FC<Props> = ({post}) => {
	const history = useHistory()
	const created = formatDistanceToNow(post.createdAt * 1000)

	const onClick = (url: string) => {
		history.push(url)
	}

	return (
		<div className={s.footer}>
			<div className={s.author}>
				<Button className={s.user} type='text' onClick={onClick.bind(null, `/user/${post.author.id}`)}>
					{post.author.username}
				</Button>
			</div>
			<div>{created}</div>
			<Button type='text' onClick={onClick.bind(null, `/post/${post.id}`)}>
				<span>
					{post && post.commentsNumber}
				</span>
				<CommentOutlined/>
			</Button>
		</div>
	)
}
