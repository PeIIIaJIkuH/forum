import {FC} from 'react'
import {ICategory} from '../../../types'
import {categoriesQuery} from '../../../utils/helpers'
import s from '../Posts.module.css'
import {useHistory} from 'react-router-dom'
import {Tag} from 'antd'

type Props = {
	categories: ICategory[]
}

export const Categories: FC<Props> = ({categories}) => {
	const history = useHistory()

	const onClick = (categoryName: string) => {
		const query = categoriesQuery(categoryName)
		history.push(`/by-categories?${query}`)
	}

	return categories && (
		<div className={s.categories}>
			{categories.map(({id, name}) => (
				<Tag className={s.tag} key={id} onClick={onClick.bind(null, name)}>
					{name}
				</Tag>
			))}
		</div>
	)
}
