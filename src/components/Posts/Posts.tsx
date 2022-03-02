import * as queryString from 'query-string'
import {FC, useEffect, useState} from 'react'
import {IComment, IPost} from '../../types'
import {useHistory, useLocation, useRouteMatch} from 'react-router-dom'
import {Error403} from '../common/errors/Error403'
import {Error404} from '../common/errors/Error404'
import {Helmet} from 'react-helmet'
import {Post} from './Post/Post'
import authState from '../../store/authState'
import {observer} from 'mobx-react-lite'
import postsState from '../../store/postsState'
import s from './Posts.module.css'
import {Card, Empty, Spin, Tag, Typography} from 'antd'
import appState from '../../store/appState'
import {LoadingOutlined} from '@ant-design/icons'

type Props = & {
	type?: 'my' | 'user' | 'up-voted' | 'down-voted' | 'post-page' | 'categories'
	postPage?: boolean
	userComments?: { [key: string]: IComment[] } | null
	postId?: number
}

export const Posts: FC<Props> = observer(({type, userComments, postId}) => {
	const history = useHistory()
	const location = useLocation()
	const match = useRouteMatch<{ id: string }>()
	const urlId = match.params.id
	const [title, setTitle] = useState('Home')

	useEffect(() => {
		if (type === 'my') {
			setTitle('My Posts')
			authState.user?.id && postsState.fetchUserPosts(authState.user?.id).then()
		} else if (type === 'user') {
			setTitle('user')
			postsState.fetchUserPosts(+urlId).then()
		} else if (type === 'up-voted' || type === 'down-voted') {
			setTitle(type === 'up-voted' ? 'Upvoted Posts' : 'Downvoted Posts')
			authState.user?.id && postsState.fetchRatedPosts(authState.user?.id, type === 'up-voted').then()
		} else if (type === 'categories') {
			setTitle('Search by Categories')
			const parsed = queryString.parse(location.search, {arrayFormat: 'comma'})
			const categories = parsed.categories
			if (categories) {
				if (Array.isArray(categories)) {
					postsState.setSelectedCategories(categories)
					postsState.fetchPostsByCategories(categories).then()
				} else {
					postsState.setSelectedCategories([categories])
					postsState.fetchPostsByCategories([categories]).then()
				}
			}
		} else if (type === undefined) {
			setTitle('Home')
			postsState.fetchAllPosts().then()
		}
	}, [type, urlId, postId, history, location.pathname, location.search])


	if ((urlId !== undefined && isNaN(+urlId)) || (type === 'categories' && !postsState.selectedCategories)) {
		return <Error404/>
	}
	if (!authState.user && (type === 'my' || type === 'up-voted' || type === 'down-voted')) {
		return <Error403/>
	}

	return (
		<>
			<Helmet>
				<title>{title} | forume</title>
			</Helmet>
			{type === 'categories' && (
				<>
					<section className={s.searchByCategories}>
						<Card title={(
							<Typography.Title level={4}>Search by Categories</Typography.Title>
						)}
						>
							{postsState.selectedCategories?.map(name => <Tag key={name}>{name}</Tag>)}
						</Card>
					</section>
				</>
			)}
			<Spin spinning={appState.isLoading} indicator={<LoadingOutlined className={s.spinnerIcon}/>}>
				<section className='posts'>
					{postsState.posts?.length ?
						postsState.posts.map((post: IPost) => (
							<Post post={post} key={post.id}
								comments={userComments ? userComments[post.id] : undefined}
							/>
						)) : (
							<Card>
								<Empty className={s.empty} description='No Posts'/>
							</Card>
						)
					}
				</section>
			</Spin>
		</>
	)
})
