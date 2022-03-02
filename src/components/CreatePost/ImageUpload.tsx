import {FC, useState} from 'react'
import {InboxOutlined} from '@ant-design/icons'
import {observer} from 'mobx-react-lite'
import {message, Upload} from 'antd'

type Props = {
	defaultFileList: any
	setFormData: (formData: FormData | null) => void
	setImageState: (isImage: -1 | 0 | 1) => void
}

export const ImageUpload: FC<Props> = observer(({defaultFileList, setFormData, setImageState}) => {
	const [fileList, setFileList] = useState<any[]>([])

	const beforeUpload = ({size, type}: any) => {
		if (type.split('/')[0] !== 'image') {
			message.error('you can upload only image').then()
			return false
		}
		if (size / 1024 / 1024 >= 20) {
			message.error('image size must be less than 20 megabytes').then()
			return false
		}
		return true
	}

	const customRequest = async ({file, onSuccess}: any) => {
		const formData = new FormData()
		formData.append('image', file)
		setFileList([file])
		setFormData(formData)
		setImageState(1)
		onSuccess()
		// TODO: make image thumbnail
	}

	const onRemove = () => {
		setFileList([])
		setFormData(null)
		setImageState(-1)
	}

	return (
		<Upload.Dragger name='image' fileList={fileList} beforeUpload={beforeUpload} maxCount={1} listType='picture'
			customRequest={customRequest} defaultFileList={defaultFileList} onRemove={onRemove}
		>
			<p className='ant-upload-drag-icon'>
				<InboxOutlined/>
			</p>
			<p className='ant-upload-text'>Click or drag file to this area to upload</p>
		</Upload.Dragger>
	)
})
