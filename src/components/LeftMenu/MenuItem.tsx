import {FC, ReactNode} from 'react'
import s from '../User/User.module.css'
import {Menu} from 'antd'

type Props = {
	key: string
	icon: ReactNode
	forAll?: boolean
	isAuth?: boolean
	title: string
	available?: boolean
	props?: any
}

export const MenuItem: FC<Props> = ({key, icon, forAll, isAuth, title, available, ...rest}) => (
	<Menu.Item className={s.menuItem} key={key} icon={icon} disabled={!(isAuth || forAll) || !available} {...rest}>
		{title}
	</Menu.Item>
)
