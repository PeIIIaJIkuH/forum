import {CommentOutlined, DislikeOutlined, LikeOutlined, UserOutlined} from '@ant-design/icons'
import {FC, useEffect, useState} from 'react'
import {Error404} from '../common/errors/Error404'
import {Helmet} from 'react-helmet'
import {MenuItem} from '../LeftMenu/MenuItem'
import {Posts} from '../Posts/Posts'
import {UserInfo} from './UserInfo'
import commentsState from '../../store/commentsState'
import {observer} from 'mobx-react-lite'
import postsState from '../../store/postsState'
import s from './User.module.css'
import {useHistory, useRouteMatch} from 'react-router-dom'
import userState from '../../store/userState'
import {Menu} from 'antd'
import queryString from 'query-string'

export const User: FC = observer(() => {
	const match = useRouteMatch<{ id: string }>()
	const urlId = match.params.id
	const [check, setCheck] = useState(true)
	const title = userState.user?.username || 'User Page'
	const parsed = queryString.parse(location.search)
	const history = useHistory()

	const getCorrectType = (type: string | string[] | null): string => {
		if (type === 'created' || type === 'up-voted' || type === 'down-voted' || type === 'commented') {
			return type
		}
		return 'created'
	}

	const [prevKey, setPrevKey] = useState(getCorrectType(parsed.type))

	useEffect(() => {
		const f = async () => {
			const status = await userState.fetchUser(+urlId)
			if (!status) {
				setCheck(false)
			}
			await postsState.fetchUserPosts(+urlId)
		}
		f().then()
	}, [urlId])

	if ((urlId !== undefined && isNaN(+urlId)) || !check) {
		return <Error404/>
	}

	const onClick = async ({key}: any) => {
		if (key === prevKey) {
			return
		}
		setPrevKey(key)
		history.push({search: queryString.stringify({type: key})})
		if (key === 'created') {
			await postsState.fetchUserPosts(+urlId)
		} else if (key === 'up-voted') {
			await postsState.fetchRatedPosts(+urlId, true)
		} else if (key === 'down-voted') {
			await postsState.fetchRatedPosts(+urlId, false)
		} else {
			await postsState.fetchCommentedPosts(+urlId)
		}
	}

	return (
		userState.user && (
			<>
				<Helmet>
					<title>{title} | forume</title>
				</Helmet>
				<UserInfo/>
				<Menu className={s.menu} mode='horizontal' defaultSelectedKeys={[getCorrectType(parsed.type)]}
					onClick={onClick}
				>
					<MenuItem key='created' title='Created' icon={<UserOutlined/>} forAll available/>
					<MenuItem key='up-voted' title='Upvoted' icon={<LikeOutlined/>} forAll available/>
					<MenuItem key='down-voted' title='Downvoted' icon={<DislikeOutlined/>} forAll available/>
					<MenuItem key='commented' title='Commented' icon={<CommentOutlined/>} forAll available/>
				</Menu>
				<Posts userComments={commentsState.userComments}/>
			</>
		)
	)
})
