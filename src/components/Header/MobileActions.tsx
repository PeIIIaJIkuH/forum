import {CloseOutlined, MenuOutlined} from '@ant-design/icons'
import {FC, useState} from 'react'
import {EUserRole} from '../../types'
import {Notifications} from '../Notifications/Notifications'
import appState from '../../store/appState'
import authState from '../../store/authState'
import {observer} from 'mobx-react-lite'
import s from './Header.module.css'
import {useHistory} from 'react-router-dom'
import {Button, Popover} from 'antd'

type Props = {
	onSignOut: () => void
}

export const MobileActions: FC<Props> = observer(({onSignOut}) => {
	const history = useHistory()
	const [visible, setVisible] = useState(false)

	const toggleMenu = () => {
		appState.setIsMenuOpen(!appState.isMenuOpen)
	}

	const handleVisibleChange = (visible: boolean) => {
		setVisible(visible)
	}

	const onClick = (url: string) => {
		setVisible(false)
		appState.setIsMenuOpen(false)
		history.push(url)
	}

	const content = (
		<div className={s.content}>
			<Button type='link' onClick={onClick.bind(null, `/user/${authState.user?.id}`)}>
				Profile
			</Button>
			{authState.role === EUserRole.admin && (
				<Button type='link' onClick={onClick.bind(null, '/admin')}>
					dashboard
				</Button>
			)}
			{authState.role === EUserRole.moderator && (
				<Button type='link' onClick={onClick.bind(null, '/moderator')}>
					dashboard
				</Button>
			)}
			<Button type='link' danger onClick={onSignOut}>
				Sign Out
			</Button>
		</div>
	)

	return (
		<div className='mobileActions'>
			<Notifications/>
			<Popover placement='bottom' content={content} trigger='click' visible={visible}
				onVisibleChange={handleVisibleChange}
			>
				<Button type='text'>{authState.user?.username}</Button>
			</Popover>
			<Button type='text' icon={!appState.isMenuOpen ? <MenuOutlined/> : <CloseOutlined/>} onClick={toggleMenu}/>
		</div>
	)
})
