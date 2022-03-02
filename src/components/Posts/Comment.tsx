import {ChangeEvent, FC, ReactNode, useRef, useState} from 'react'
import {DeleteOutlined, DownOutlined, EditOutlined, MoreOutlined, SaveOutlined, UpOutlined} from '@ant-design/icons'
import {IComment} from '../../types'
import appState from '../../store/appState'
import authState from '../../store/authState'
import commentsState from '../../store/commentsState'
import cx from 'classnames'
import {observer} from 'mobx-react-lite'
import s from './Posts.module.css'
import useOnClickOutside from '../../utils/useOnClickOutside'
import {Button, Comment as AntComment, Input, message, Popover} from 'antd'

type Props = {
	author: ReactNode
	content: string
	datetime: ReactNode
	comment: IComment
	isAuthor: boolean
	isAdmin: boolean
	userPage?: boolean
}

export const Comment: FC<Props> = observer(({author, content, datetime, comment, isAuthor, userPage, isAdmin}) => {
	const [isEdit, setIsEdit] = useState(false)
	const [text, setText] = useState(content)
	const [visible, setVisible] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const paragraphs = content.split('\n').map((paragraph: string, i: number) => (<p key={i}>{paragraph}</p>))

	const onDelete = async () => {
		let status: boolean
		appState.setIsLoading(true)
		if (!userPage) {
			status = await commentsState.deleteComment(comment.id, {isAdmin})
		} else {
			status = await commentsState.deleteComment(comment.id, {isAdmin, postId: comment.postId})
		}
		appState.setIsLoading(false)
		setVisible(false)
		if (status) {
			message.success('comment was deleted successfully')
		} else {
			message.error('can not delete comment')
		}
	}

	const onEdit = async () => {
		let status = true
		if (!isEdit) {
			setIsEdit(true)
		} else {
			appState.setIsLoading(true)
			status = await commentsState.editComment(comment, text)
			appState.setIsLoading(false)
			setIsEdit(false)
		}
		if (!status) {
			message.error('can not edit comment')
		}
	}

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.currentTarget.value)
	}

	const editIcon = <EditOutlined className={s.icon}/>
	const saveIcon = <SaveOutlined className={s.icon}/>
	const editBtn = (
		<Button type='text' icon={!isEdit ? editIcon : saveIcon} onClick={onEdit} loading={appState.isLoading}/>
	)
	const deleteBtn = (
		<Button danger type='text' icon={<DeleteOutlined className={s.icon}/>} onClick={onDelete}
			loading={appState.isLoading}
		/>
	)
	const cContent = !isEdit ? paragraphs : (
		<Input.TextArea autoSize={{minRows: 1, maxRows: 5}} defaultValue={content} onChange={onChange} allowClear
			autoFocus
		/>
	)

	const handleVisibleChange = (visible: boolean) => {
		setVisible(visible)
	}

	const isRatedUp = comment.userRating === 1
	const isRatedDown = comment.userRating === -1
	const upRef = useRef<HTMLDivElement>(null)
	const downRef = useRef<HTMLDivElement>(null)

	const onUpClick = async () => {
		appState.setIsLoading(true)
		const status = await commentsState.setCommentRating(comment, 1)
		appState.setIsLoading(false)
		if (upRef.current) {
			upRef.current.blur()
		}
		if (!status) {
			message.error('can not rate comment')
		}
	}

	const onDownClick = async () => {
		appState.setIsLoading(true)
		const status = await commentsState.setCommentRating(comment, -1)
		appState.setIsLoading(false)
		if (downRef.current) {
			downRef.current.blur()
		}
		if (!status) {
			message.error('can not rate comment')
		}
	}

	const upBtn = (
		<Button className={cx(s.commentUp, isRatedUp && s.commentRatedUp)} icon={<UpOutlined/>} ref={upRef}
			disabled={!authState.user?.id} onClick={onUpClick} loading={appState.isLoading} type='text' size='small'
		/>
	)
	const downBtn = (
		<Button className={cx(s.downComment, isRatedDown && s.commentRatedDown)} icon={<DownOutlined/>} ref={downRef}
			disabled={!authState.user?.id} onClick={onDownClick} loading={appState.isLoading} type='text' size='small'
		/>
	)
	const rating = <div>{comment.commentRating}</div>

	const clickOutsideEdit = () => {
		if (isEdit) {
			onEdit().then()
		}
	}

	useOnClickOutside(ref, clickOutsideEdit)

	const updatedAuthor = (
		<>
			{author}
			{(isAuthor || isAdmin) && (
				<Popover trigger='click' placement='top' visible={visible} onVisibleChange={handleVisibleChange}
					content={(
						<div className='actions'>
							{isAuthor ? (
								<>
									{editBtn}
									{deleteBtn}
								</>
							) : (isAdmin && deleteBtn)}
						</div>
					)}
				>
					<Button type='text' icon={<MoreOutlined/>} size='small'/>
				</Popover>
			)}
		</>
	)

	return (
		<div ref={ref}>
			<AntComment author={updatedAuthor} content={cContent} datetime={datetime} actions={[upBtn, rating, downBtn]}
				key={comment.id}
			/>
		</div>
	)
})
