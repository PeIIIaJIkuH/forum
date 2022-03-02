import {FC} from 'react'
import {Helmet} from 'react-helmet'
import {Link} from 'react-router-dom'
import {Button, Result} from 'antd'

type Props = {
	text?: string
}

export const Error404: FC<Props> = ({text}) => {
	const extra = (
		<Link to='/'>
			<Button type='primary'>Back Home</Button>
		</Link>
	)
	const subTitle = text || 'Sorry, the page you visited does not exist.'

	return (
		<>
			<Helmet>
				<title>Error 404 | forume</title>
			</Helmet>
			<Result status='404' title='404' subTitle={subTitle} extra={extra}/>
		</>
	)
}
