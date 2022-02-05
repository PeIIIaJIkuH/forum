import React, {FC} from 'react'
import s from './RightMenu.module.css'
import {LeftMenu} from '../LeftMenu/LeftMenu'
import Layout from 'antd/lib/layout'
import {observer} from 'mobx-react-lite'
import appState from '../../store/appState'
import cx from 'classnames'

export const RightMenu: FC = observer(() => {
	return (
		<div className={cx(s.wrapper, appState.isMenuOpen && s.open)}>
			<LeftMenu mobile/>

			<Layout.Footer className={s.footer}>
				<div>by PeIIIaJIkuH and indecember</div>
				<div>GO, React, SQLite3</div>
				<div>February, 2021</div>
			</Layout.Footer>
		</div>
	)
})
