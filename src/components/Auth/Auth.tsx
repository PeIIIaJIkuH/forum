import {FC, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {AuthForm} from './AuthForm'
import Card from 'antd/lib/card'
import {Error403} from '../common/errors/Error403'
import {Helmet} from 'react-helmet'
import appState from '../../store/appState'
import authState from '../../store/authState'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'
import s from './Auth.module.css'
import {useForm} from 'antd/lib/form/Form'

type Props = {
	register?: boolean
}

export const Auth: FC<Props> = observer(({register}) => {
	const history = useHistory()
	const [form] = useForm()
	const [isFetching, setIsFetching] = useState(false)
	const [type, setType] = useState<'user' | 'moderator' | 'admin'>('user')

	if (authState.user) {
		return <Error403 text='Sorry, you are authorized, you have no access to the authorization page.'/>
	}

	type obj = {
		username: string
		email: string
		password: string
		adminToken: string
	}
	const onSubmit = async ({username, email, password, adminToken}: obj) => {
		setIsFetching(true)
		if (register) {
			const status = await authState.signUp(username, email, password, adminToken, type === 'moderator')
			setIsFetching(false)
			if (status) {
				message.success('you were registered successfully')
				form.resetFields()
				history.push('/auth/signin')
			} else {
				message.error('can not register')
			}
		} else {
			const status = await authState.signIn(username, password)
			setIsFetching(false)
			if (status) {
				if (appState.url) {
					const url = appState.url
					appState.setUrl('')
					history.push(url)
				} else {
					history.push('/')
				}
			} else message.error('can not login')
		}
	}

	const onClick = () => {
		form.resetFields()
	}

	const title = register ? 'Sign Up' : 'Sign In',
		path = register ? '/auth/signin' : '/auth/signup',
		extra = (
			<Link to={path} onClick={onClick}>
				{!register ? 'Sign Up' : 'Sign In'}
			</Link>
		)

	return (
		<>
			<Helmet>
				<title>{title} | forume</title>
			</Helmet>
			<div className={s.wrapper}>
				<Card className={s.card} title={title} extra={extra}>
					<AuthForm
						onsubmit={onSubmit}
						register={register}
						form={form}
						isFetching={isFetching}
						type={type}
						setType={setType}
					/>
				</Card>
			</div>
		</>
	)
})
