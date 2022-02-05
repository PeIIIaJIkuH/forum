import React, {FC} from 'react'
import s from './Header.module.css'
import Button from 'antd/lib/button'
import {Link} from 'react-router-dom'
import {Notifications} from './Notifications'
import {EUserRole} from '../../types'
import {observer} from 'mobx-react-lite'
import authState from '../../store/authState'

type Props = {
	onSignOut: () => void
}

export const Actions: FC<Props> = observer(({onSignOut}) => (
	<div className={s.actions}>
		<Notifications/>
		{authState.role === EUserRole.admin && (
			<Link className={s.dashboard} to='/admin'>dashboard</Link>
		)}
		{authState.role === EUserRole.moderator && (
			<Link className={s.dashboard} to='/moderator'>dashboard</Link>
		)}
		<Link className={s.username} to={`/user/${authState.user?.id}`}>{authState.user?.username}</Link>
		<Button className={s.auth} type='link' danger onClick={onSignOut}>
			Sign Out
		</Button>
	</div>
))
