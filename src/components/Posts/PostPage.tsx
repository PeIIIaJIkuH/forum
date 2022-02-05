import React, {FC, useEffect, useState} from 'react'
import {useRouteMatch} from 'react-router-dom'
import s from './Posts.module.css'
import {CommentForm} from './CommentForm'
import {Comments} from './Comments'
import Card from 'antd/lib/card'
import {Helmet} from 'react-helmet'
import {Error404} from '../common/errors/Error404'
import message from 'antd/lib/message'
import {Posts} from './Posts'
import postsState from '../../store/postsState'
import commentsState from '../../store/commentsState'
import {commentsAPI} from '../../api/comments'
import {observer} from 'mobx-react-lite'

export const PostPage: FC = observer(() => {
	const match = useRouteMatch<{ id: string }>()
	const urlId = match.params.id
	const [check, setCheck] = useState(true)

	useEffect(() => {
		const initialize = async () => {
			const status = await postsState.fetchPost(+urlId)
			if (!status) {
				setCheck(false)
			}
			await commentsState.fetchComments(+urlId)
		}
		initialize().then()
	}, [urlId])

	if ((urlId !== undefined && isNaN(+urlId)) || !check) {
		return <Error404/>
	}

	type obj = { content: string }
	const onSubmit = async ({content}: obj) => {
		const {status} = await commentsAPI.createComment(+urlId, content
			.replace(/((\r\n)|\r|\n)+/gm, '\n').split('\n')
			.map(line => line.trim()).join('\n'))
		if (status) {
			await commentsState.fetchComments(+urlId)
		} else {
			message.error('can not add comment')
		}
	}

	return postsState.posts && (
		<>
			<Helmet><title>Comments | forume</title></Helmet>
			<Posts postPage type='post-page' postId={+urlId}/>
			<section className={s.comments}>
				<Card className={s.commentsCard}>
					<CommentForm onSubmit={onSubmit}/>
					<Comments comments={commentsState.allComments}/>
				</Card>
			</section>
		</>
	)
})
