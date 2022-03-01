import {FC, useEffect} from 'react'
import {Route, Switch, useLocation} from 'react-router-dom'

import {Actions} from './components/Actions/Actions'
import {AdminDashboard} from './components/AdminDashboard/AdminDashboard'
import Affix from 'antd/lib/affix'
import {AppPreloader} from './components/common/preloaders/AppPreloader'
import {Auth} from './components/Auth/Auth'
import {Content} from 'antd/lib/layout/layout'
import {CreatePost} from './components/CreatePost/CreatePost'
import {EUserRole} from './types'
import {Error404} from './components/common/errors/Error404'
import {Header} from './components/Header/Header'
import Layout from 'antd/lib/layout'
import {LeftMenu} from './components/LeftMenu/LeftMenu'
import {ModeratorDashboard} from './components/ModeratorDashboard/ModeratorDashboard'
import {PostPage} from './components/Posts/PostPage'
import {Posts} from './components/Posts/Posts'
import {RightMenu} from './components/RightMenu/RightMenu'
import Sider from 'antd/lib/layout/Sider'
import {User} from './components/User/User'
import appState from './store/appState'
import authState from './store/authState'
import cx from 'classnames'
import moderatorState from './store/moderatorState'
import {observer} from 'mobx-react-lite'
import s from './App.module.css'
import {useCookies} from 'react-cookie'
import {useMediaQuery} from 'react-responsive'

// FEATURES:
// Load posts, comments, ratings, notifications
// (Create/edit/delete/rate) (post/comment/notification)
// Change posts type: all, my, upvoted, downvoted, by-categories, on user page: created, upvoted, downvoted, commented

// TODO:
// check all the features and functions

export const App: FC = observer(() => {
	const location = useLocation()
	const isTabletOrMobile = useMediaQuery({maxWidth: 1200})
	const removeCookies = useCookies(['forumSecretKey'])[2]

	useEffect(() => {
		const f = async () => {
			await appState.initialize()
			if (!authState.user) {
				removeCookies('forumSecretKey')
			}
			if (authState.role === EUserRole.moderator) {
				await moderatorState.fetchModeratorReports()
			}
		}
		f().then()
	}, [removeCookies])

	useEffect(() => {
		appState.setIsMenuOpen(false)
	}, [location.pathname])

	if (!appState.initialized) {
		return <AppPreloader/>
	}

	return (
		<div className={s.App}>
			<Layout className={s.layout}>
				<Header/>
				<Layout className={s.innerLayout}>
					{!isTabletOrMobile && (
						<Affix offsetTop={105} className={cx(s.affix, s.menu)}>
							<Sider theme='light' trigger={null} className={s.sider}>
								<LeftMenu/>
							</Sider>
						</Affix>
					)}
					<Content className={s.content}>
						<Switch>
							<Route exact path='/auth/signup'>
								<Auth register/>
							</Route>
							<Route exact path='/auth/signin'>
								<Auth/>
							</Route>
							<Route exact path={['/create', '/edit']}>
								<CreatePost/>
							</Route>
							<Route exact path='/post/:id'>
								<PostPage/>
							</Route>
							<Route exact path='/user/:id'>
								<User/>
							</Route>
							<Route exact path='/my'>
								<Posts type='my'/>
							</Route>
							<Route exact path='/up-voted'>
								<Posts type='up-voted'/>
							</Route>
							<Route exact path='/down-voted'>
								<Posts type='down-voted'/>
							</Route>
							<Route exact path='/by-categories'>
								<Posts type='categories'/>
							</Route>
							<Route exact path='/'>
								<Posts/>
							</Route>
							<Route exact path='/admin'>
								<AdminDashboard/>
							</Route>
							<Route exact path='/moderator'>
								<ModeratorDashboard/>
							</Route>
							<Route>
								<Error404/>
							</Route>
						</Switch>
					</Content>
					{!isTabletOrMobile && (
						<Affix offsetTop={105} className={cx(s.affix, s.actions)}>
							<Sider theme='light' trigger={null} className={s.sider}>
								<Actions/>
							</Sider>
						</Affix>
					)}
					{isTabletOrMobile && <RightMenu/>}
				</Layout>
			</Layout>
		</div>
	)
})
