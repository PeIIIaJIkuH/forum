import Button from 'antd/lib/button'
import {FC} from 'react'
import Form from 'antd/lib/form'
import TextArea from 'antd/lib/input/TextArea'
import appState from '../../store/appState'
import authState from '../../store/authState'
import {defaultValidator} from '../../utils/helpers'
import s from './Posts.module.css'
import {useForm} from 'antd/lib/form/Form'

type Props = {
	onSubmit: (obj: { content: string }) => Promise<void>
}

export const CommentForm: FC<Props> = ({onSubmit}) => {
	const [form] = useForm()

	const onFinish = async (data: any) => {
		appState.setIsLoading(true)
		await onSubmit(data)
		form.resetFields()
		appState.setIsLoading(false)
	}

	return (
		<Form form={form} onFinish={onFinish}>
			<Form.Item name='content' rules={[defaultValidator('Comment')]}>
				<TextArea allowClear rows={5} autoSize={{minRows: 2, maxRows: 5}} showCount disabled={!authState.user}/>
			</Form.Item>
			<Form.Item>
				<Button className={s.addComment} type='primary' htmlType='submit' disabled={!authState.user}
					loading={appState.isLoading}
				>
					Add Comment
				</Button>
			</Form.Item>
		</Form>
	)
}
