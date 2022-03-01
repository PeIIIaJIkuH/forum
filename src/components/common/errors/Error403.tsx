import {Link, useLocation} from 'react-router-dom'

import Button from 'antd/lib/button'
import {FC} from 'react'
import {Helmet} from 'react-helmet'
import Result from 'antd/lib/result'
import appState from '../../../store/appState'
import {observer} from 'mobx-react-lite'

type Props = {
	text?: string
}

export const Error403: FC<Props> = observer(({text}) => {
	const location = useLocation()

	const onClick = async () => {
		if (location.pathname === '/auth/signup' || location.pathname === '/admin' ||
			location.pathname === '/moderator') {
			return
		}
		appState.setUrl(location.pathname)
	}

	return (
		<>
			<Helmet>
				<title>Error 403 | forume</title>
			</Helmet>
			<Result status='403' title='403' subTitle={text || 'Sorry, you are not authorized to access this page.'}
				extra={
					<>
						<Link to='/'>
							<Button type={text ? 'primary' : 'default'}>Back Home</Button>
						</Link>
						{!text && (
							<Link to='/auth/signin'>
								<Button type='primary' onClick={onClick}>
									Authorize
								</Button>
							</Link>
						)}
					</>
				}
			/>
		</>
	)
})
