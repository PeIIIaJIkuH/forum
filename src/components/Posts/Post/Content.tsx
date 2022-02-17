import {FC} from 'react'
import s from '../Posts.module.css'

type Props = {
	content: string
}

export const Content: FC<Props> = ({content}) => {
	return (
		<div className={s.content}>
			{content.split('\n').map((paragraph, i) => (
				<p className={s.line} key={i}>{paragraph}</p>
			))}
		</div>
	)
}
