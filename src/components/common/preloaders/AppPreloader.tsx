import {FC} from 'react'
import s from './AppPreloader.module.css'

export const AppPreloader: FC = () => (
	<div className={s.wrapper}>
		<div className={s.boxes}>
			<div className={s.box}>
				<div/>
				<div/>
				<div/>
				<div/>
			</div>
			<div className={s.box}>
				<div/>
				<div/>
				<div/>
				<div/>
			</div>
			<div className={s.box}>
				<div/>
				<div/>
				<div/>
				<div/>
			</div>
			<div className={s.box}>
				<div/>
				<div/>
				<div/>
				<div/>
			</div>
		</div>
	</div>
)
