import {FC, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Actions} from './Actions'
import {MobileActions} from './MobileActions'
import {ProgressBar} from '../ProgressBar/ProgressBar'
import appState from '../../store/appState'
import authState from '../../store/authState'
import logo from '../../assets/img/logo.svg'
import {observer} from 'mobx-react-lite'
import s from './Header.module.css'
import {useMediaQuery} from 'react-responsive'
import userState from '../../store/userState'
import {Affix, Button, Image, Layout, message} from 'antd'

export const Header: FC = observer(() => {
	const location = useLocation()
	const isTabletOrMobile = useMediaQuery({maxWidth: 1200})

	useEffect(() => {
		if (authState.user) {
			userState.fetchAllNotifications().then()
		}
	}, [location.pathname])

	const onSignOut = async () => {
		const status = await authState.signOut()
		appState.setIsMenuOpen(false)
		if (!status) {
			message.error('can not logout').then()
		}
	}

	const onAuth = () => {
		if (location.pathname === '/auth/signup' || location.pathname === '/admin' ||
			location.pathname === '/moderator') {
			return
		}
		appState.setUrl(location.pathname)
	}

	return (
		<Affix offsetTop={1} className={s.headerWrapper}>
			<Layout.Header className={s.header}>
				<ProgressBar/>
				<div className={s.inner}>
					<Link to='/' className={s.logo}>
						<Image width={50} src={logo} preview={false} alt='logo'/>
						forume
					</Link>
					{authState.user ? (
						!isTabletOrMobile ? (
							<Actions onSignOut={onSignOut}/>
						) : (
							<MobileActions onSignOut={onSignOut}/>
						)
					) : (
						<Link to='/auth/signin'>
							<Button className={s.auth} type='link' onClick={onAuth}>
								Sign In
							</Button>
						</Link>
					)}
				</div>
			</Layout.Header>
		</Affix>
	)
})
