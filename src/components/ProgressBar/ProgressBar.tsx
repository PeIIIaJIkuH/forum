import {FC} from 'react'
import s from './ProgressBar.module.css'
import {observer} from 'mobx-react-lite'
import cx from 'classnames'
import appState from '../../store/appState'

export const ProgressBar: FC = observer(() => {
	return (
		<div className={cx(s.bar, !appState.isLoading && s.hidden)}>
			<div className={s.value}/>
		</div>
	)
})
