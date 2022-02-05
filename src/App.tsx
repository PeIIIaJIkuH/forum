import React, {FC, useEffect} from 'react'
import s from './App.module.css'
import {Route, Switch, useLocation} from 'react-router-dom'
import {Header} from './components/Header/Header'
import {Auth} from './components/Auth/Auth'
import {CreatePost} from './components/CreatePost/CreatePost'
import {LeftMenu} from './components/LeftMenu/LeftMenu'
import {Actions} from './components/Actions/Actions'
import {Error404} from './components/common/errors/Error404'
import {AppPreloader} from './components/common/preloaders/AppPreloader'
import {Posts} from './components/Posts/Posts'
import {PostPage} from './components/Posts/PostPage'
import {User} from './components/User/User'
import Layout from 'antd/lib/layout'
import Sider from 'antd/lib/layout/Sider'
import {Content} from 'antd/lib/layout/layout'
import Affix from 'antd/lib/affix'
import {useMediaQuery} from 'react-responsive'
import {RightMenu} from './components/RightMenu/RightMenu'
import {AdminDashboard} from './components/AdminDashboard/AdminDashboard'
import {observer} from 'mobx-react-lite'
import appState from './store/appState'
import {useCookies} from 'react-cookie'
import authState from './store/authState'
import {ModeratorDashboard} from './components/ModeratorDashboard/ModeratorDashboard'
import {EUserRole} from './types'
import moderatorState from './store/moderatorState'
import cx from 'classnames'

// FEATURES:
// Load posts, comments, ratings, notifications
// Create/edit/delete post/comment/notification
// Rate post, comment
// Change posts type: all, my, upvoted, downvoted, by-categories, on user page: created, upvoted, downvoted, commented

// TODO:
// check all the features and functions
// make all requests for several items paginated: take only some portion of it, and just scroll to request more

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
							<Route exact path='/auth/signup'><Auth register/></Route>
							<Route exact path='/auth/signin'><Auth/></Route>
							<Route exact path={['/create', '/edit']}><CreatePost/></Route>
							<Route exact path='/post/:id'><PostPage/></Route>
							<Route exact path='/user/:id'><User/></Route>
							<Route exact path='/my'><Posts type='my'/></Route>
							<Route exact path='/up-voted'><Posts type='up-voted'/></Route>
							<Route exact path='/down-voted'><Posts type='down-voted'/></Route>
							<Route exact path='/by-categories'><Posts type='categories'/></Route>
							<Route exact path='/'><Posts/></Route>
							<Route exact path='/admin'><AdminDashboard/></Route>
							<Route exact path='/moderator'><ModeratorDashboard/></Route>
							<Route><Error404/></Route>
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
