import * as queryString from 'query-string'
import {FC, useEffect, useState} from 'react'
import {CreatePostForm} from './CreatePostForm'
import {Error403} from '../common/errors/Error403'
import {Error404} from '../common/errors/Error404'
import {Helmet} from 'react-helmet'
import authState from '../../store/authState'
import {observer} from 'mobx-react-lite'
import postsState from '../../store/postsState'
import s from './CreatePost.module.css'
import {useLocation} from 'react-router-dom'
import {Card} from 'antd'

export const CreatePost: FC = observer(() => {
	const location = useLocation()
	const [isFetching, setIsFetching] = useState(false)

	useEffect(() => {
		const initialize = async () => {
			const parsed = queryString.parse(location.search)
			const id = parseInt(parsed.id as string)
			postsState.fetchEditing(id).then()
		}
		initialize().then()
	}, [location.search])

	if (!authState.user) {
		return <Error403/>
	}
	if (location.pathname.indexOf('/edit') === 0 && !postsState.editing) {
		return <Error404/>
	}

	return (
		<>
			<Helmet>
				<title>Create Post | forume</title>
			</Helmet>
			<div className={s.wrapper}>
				<Card className={s.card} title={(postsState.editing ? 'Edit' : 'Create') + ' post'}
					headStyle={{fontSize: '20px', fontWeight: 600}}
				>
					<CreatePostForm setIsFetching={setIsFetching} isFetching={isFetching}/>
				</Card>
			</div>
		</>
	)
})
