import {FC, useEffect, useState} from 'react'
import {Error404} from '../common/errors/Error404'
import {Helmet} from 'react-helmet'
import {UserInfo} from './UserInfo'
import {observer} from 'mobx-react-lite'
import postsState from '../../store/postsState'
import s from './User.module.css'
import {useHistory, useRouteMatch} from 'react-router-dom'
import userState from '../../store/userState'
import queryString from 'query-string'
import {Tabs} from 'antd'
import {Posts} from '../Posts/Posts'
import commentsState from '../../store/commentsState'

export const User: FC = observer(() => {
	const match = useRouteMatch<{id: string}>()
	const urlId = match.params.id
	const [check, setCheck] = useState(true)
	const title = userState.user?.username || 'User Page'
	const parsed = queryString.parse(location.search)
	const history = useHistory()

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

	useEffect(() => {
		if (parsed.type === 'created') {
			postsState.fetchUserPosts(+urlId).then()
		} else if (parsed.type === 'up-voted') {
			postsState.fetchRatedPosts(+urlId, true).then()
		} else if (parsed.type === 'down-voted') {
			postsState.fetchRatedPosts(+urlId, false).then()
		} else if (parsed.type === 'commented') {
			postsState.fetchCommentedPosts(+urlId).then()
		}
	}, [parsed.type])

	if ((urlId !== undefined && isNaN(+urlId)) || !check) {
		return <Error404/>
	}

	const getCorrectType = (type: string | string[] | null): string => {
		if (type === 'created' || type === 'up-voted' || type === 'down-voted' || type === 'commented') {
			return type
		}
		return 'created'
	}

	const getTab = (name: string) => (
		<div className={s.tab}>
			{name}
		</div>
	)

	const onChange = (key: string) => {
		history.push({search: queryString.stringify({type: key})})
	}

	return (
		userState.user && (
			<>
				<Helmet>
					<title>{title} | forume</title>
				</Helmet>
				<UserInfo/>
				<Tabs centered className={s.tabs} onChange={onChange} defaultActiveKey={getCorrectType(parsed.type)}>
					<Tabs.TabPane tab={getTab('Created')} key='created'>
						<Posts userComments={commentsState.userComments}/>
					</Tabs.TabPane>
					<Tabs.TabPane tab={getTab('Upvoted')} key='up-voted'>
						<Posts userComments={commentsState.userComments}/>
					</Tabs.TabPane>
					<Tabs.TabPane tab={getTab('Downvoted')} key='down-voted'>
						<Posts userComments={commentsState.userComments}/>
					</Tabs.TabPane>
					<Tabs.TabPane tab={getTab('Commented')} key='commented'>
						<Posts userComments={commentsState.userComments}/>
					</Tabs.TabPane>
				</Tabs>
			</>
		)
	)
})
