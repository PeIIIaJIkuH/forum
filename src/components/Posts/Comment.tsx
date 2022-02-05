import React, {ChangeEvent, FC, ReactNode, useRef, useState} from 'react'
import AntComment from 'antd/lib/comment'
import Button from 'antd/lib/button'
import {DeleteOutlined, DownOutlined, EditOutlined, MoreOutlined, SaveOutlined, UpOutlined} from '@ant-design/icons'
import s from './Posts.module.css'
import TextArea from 'antd/lib/input/TextArea'
import Popover from 'antd/lib/popover'
import {IComment} from '../../types'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'
import commentsState from '../../store/commentsState'
import authState from '../../store/authState'
import useOnClickOutside from '../../utils/useOnClickOutside'
import cx from 'classnames'

type Props = {
	author: ReactNode
	content: string
	datetime: ReactNode
	comment: IComment
	isAuthor: boolean
	isAdmin: boolean
	userPage?: boolean
}

export const Comment: FC<Props> = observer(({
	                                            author, content,
	                                            datetime, comment,
	                                            isAuthor, userPage, isAdmin,
                                            }) => {
	const [isEdit, setIsEdit] = useState(false)
	const [text, setText] = useState(content)
	const [visible, setVisible] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const paragraphs = content.split('\n').map((paragraph: string, i: number) => (<p key={i}>{paragraph}</p>))
	const [deleteLoading, setDeleteLoading] = useState(false)
	const [editLoading, setEditLoading] = useState(false)

	const onDelete = async () => {
		let status: boolean
		setDeleteLoading(true)
		if (!userPage) {
			status = await commentsState.deleteComment(comment.id, {isAdmin})
		} else {
			status = await commentsState.deleteComment(comment.id, {isAdmin, postId: comment.postId})
		}
		setDeleteLoading(false)
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
			setEditLoading(true)
			status = await commentsState.editComment(comment, text)
			setEditLoading(false)
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
	const editBtn =
		<Button type='text' icon={!isEdit ? editIcon : saveIcon} onClick={onEdit} loading={editLoading}/>
	const deleteBtn = (
		<Button danger type='text' icon={<DeleteOutlined className={s.icon}/>} onClick={onDelete}
		        loading={deleteLoading}
		/>
	)
	const cContent = !isEdit ? paragraphs : (
		<TextArea autoSize={{minRows: 1, maxRows: 5}} defaultValue={content} onChange={onChange} allowClear
		          autoFocus
		/>
	)

	const handleVisibleChange = (visible: boolean) => {
		setVisible(visible)
	}

	const isRatedUp = comment.userRating === 1,
		isRatedDown = comment.userRating === -1,
		[upLoading, setUpLoading] = useState(false),
		[downLoading, setDownLoading] = useState(false),
		upRef = useRef<HTMLDivElement>(null),
		downRef = useRef<HTMLDivElement>(null)

	const onUpClick = async () => {
		setUpLoading(true)
		const status = await commentsState.setCommentRating(comment, 1)
		if (upRef.current) {
			upRef.current.blur()
		}
		setUpLoading(false)
		if (!status) {
			message.error('can not rate comment')
		}
	}

	const onDownClick = async () => {
		setDownLoading(true)
		const status = await commentsState.setCommentRating(comment, -1)
		if (downRef.current) {
			downRef.current.blur()
		}
		setDownLoading(false)
		if (!status) {
			message.error('can not rate comment')
		}
	}

	const upBtn = (
		<Button className={cx(s.commentUp, isRatedUp && s.commentRatedUp)} icon={<UpOutlined/>} ref={upRef}
		        disabled={!authState.user?.id} onClick={onUpClick} loading={upLoading} type='text' size='small'
		/>
	)
	const downBtn = (
		<Button className={cx(s.downComment, isRatedDown && s.commentRatedDown)} icon={<DownOutlined/>}
		        disabled={!authState.user?.id} onClick={onDownClick} loading={downLoading} type='text' size='small'
		        ref={downRef}
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
