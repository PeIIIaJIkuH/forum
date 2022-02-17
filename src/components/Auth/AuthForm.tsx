import Form, {FormInstance} from 'antd/lib/form'
import {InfoCircleOutlined, LockOutlined, UserOutlined} from '@ant-design/icons'

import Button from 'antd/lib/button'
import {FC} from 'react'
import Input from 'antd/lib/input'
import Radio from 'antd/lib/radio/radio'
import {RadioChangeEvent} from 'antd'
import RadioGroup from 'antd/lib/radio/group'
import Tooltip from 'antd/lib/tooltip'
import {defaultValidator} from '../../utils/helpers'
import {observer} from 'mobx-react-lite'
import s from './Auth.module.css'

const tailLayout = {
	wrapperCol: {offset: 8, span: 16},
}

type Props = {
	onsubmit: (obj: {username: string; email: string; password: string; adminToken: string}) => Promise<void>
	register?: boolean
	form: FormInstance
	isFetching: boolean
	type: 'user' | 'moderator' | 'admin'
	setType: (type: 'user' | 'moderator' | 'admin') => void
}

export const AuthForm: FC<Props> = observer(({onsubmit, register, form, type, isFetching, setType}) => {
	const usernameInfo = (
		<Tooltip
			title={
				<>
					<div>4-20 characters long.</div>
					<div>Allowed: a-z, A-Z, 0-9, _, .</div>
					<div>No _, . at the beginning or end.</div>
					<div>No __, _., ._, .. inside.</div>
				</>
			}
		>
			<InfoCircleOutlined className='inputInfo' />
		</Tooltip>
	)
	const emailInfo = (
		<Tooltip title={<div>Just valid E-mail.</div>}>
			<InfoCircleOutlined className='inputInfo' />
		</Tooltip>
	)
	const passwordInfo = (
		<Tooltip
			title={
				<>
					<div>6-20 characters long.</div>
					<div>Allowed: a-z, A-Z, 0-9, _, .</div>
					<div>At least one lowercase.</div>
					<div>At least one uppercase.</div>
					<div>At least one digit.</div>
				</>
			}
		>
			<InfoCircleOutlined className='inputInfo' />
		</Tooltip>
	)
	const adminTokenInfo = (
		<Tooltip title={<div>Enter admin token to register as admin</div>}>
			<InfoCircleOutlined className='inputInfo' />
		</Tooltip>
	)

	const onChange = (e: RadioChangeEvent) => {
		setType(e.target.value)
	}

	return (
		<Form name='auth' onFinish={onsubmit} form={form}>
			<Form.Item
				name='username'
				rules={[defaultValidator('Username', register)]}
				colon={false}
				label={register && usernameInfo}
			>
				<Input prefix={<UserOutlined />} placeholder='Username' autoFocus />
			</Form.Item>
			{register && (
				<Form.Item
					name='email'
					label={emailInfo}
					colon={false}
					rules={[
						defaultValidator('E-mail', true),
						{
							type: 'email',
							message: 'The input is not valid E-mail!',
						},
					]}
				>
					<Input prefix='@' placeholder='E-mail' />
				</Form.Item>
			)}
			<Form.Item
				name='password'
				rules={[defaultValidator('Password', register)]}
				colon={false}
				label={register && passwordInfo}
			>
				<Input.Password prefix={<LockOutlined />} placeholder='Password' />
			</Form.Item>
			{register && (
				<RadioGroup defaultValue='user' onChange={onChange} className={s.radioGroup}>
					<Radio value='user' className={s.radio}>
						As user
					</Radio>
					<Radio value='moderator' className={s.radio}>
						As moderator
					</Radio>
					<Radio value='admin' className={s.radio}>
						As admin
					</Radio>
				</RadioGroup>
			)}
			{register && type === 'admin' && (
				<Form.Item
					name='adminToken'
					colon={false}
					label={register && adminTokenInfo}
					rules={[defaultValidator('AdminToken', register)]}
				>
					<Input placeholder='Admin token' />
				</Form.Item>
			)}
			<Form.Item {...tailLayout} className={s.submit}>
				<Button type='primary' htmlType='submit' loading={isFetching}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
})
