import {FC, ReactNode} from 'react'

import Menu from 'antd/lib/menu'
import s from '../User/User.module.css'

type Props = {
	key: string
	icon: ReactNode
	forAll?: boolean
	isAuth?: boolean
	title: string
	available?: boolean
	props?: any
}

export const MenuItem: FC<Props> = ({
	                                    key, icon,
	                                    forAll, isAuth, title,
	                                    available, ...props
                                    }) => (
	<Menu.Item className={s.menuItem} key={key} icon={icon} disabled={!(isAuth || forAll) || !available} {...props}>
		{title}
	</Menu.Item>)
