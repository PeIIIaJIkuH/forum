import React, {FC, useRef, useState} from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import {DownOutlined, UpOutlined} from '@ant-design/icons'
import {IPost} from '../../../types'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'
import postsState from '../../../store/postsState'
import authState from '../../../store/authState'
import cx from 'classnames'

type Props = {
	post: IPost
}

export const Rate: FC<Props> = observer(({post}) => {
	const isRatedUp = post.userRating === 1
	const isRatedDown = post.userRating === -1
	const [upIsFetching, setUpIsFetching] = useState(false)
	const [downIsFetching, setDownIsFetching] = useState(false)
	const upRef = useRef<HTMLDivElement>(null)
	const downRef = useRef<HTMLDivElement>(null)

	const onUpClick = () => {
		setUpIsFetching(true)
		const status = postsState.setRating(post, 1)
		if (upRef.current) {
			upRef.current.blur()
		}
		setUpIsFetching(false)
		if (!status) {
			message.error('can not rate post').then()
		}
	}

	const onDownClick = () => {
		setDownIsFetching(true)
		const status = postsState.setRating(post, -1)
		if (downRef.current) {
			downRef.current.blur()
		}
		setDownIsFetching(false)
		if (!status) {
			message.error('can not rate post').then()
		}
	}

	return (
		<div className={s.rating}>
			<Button className={cx(s.up, isRatedUp && s.ratedUp)} icon={<UpOutlined/>} ref={upRef}
			        disabled={!authState.user?.id} onClick={onUpClick} loading={upIsFetching}
			/>
			<div className={s.ratingNumber}>
				{post.postRating}
			</div>
			<Button className={cx(s.down, isRatedDown && s.ratedDown)} icon={<DownOutlined/>} ref={downRef}
			        disabled={!authState.user?.id} onClick={onDownClick} loading={downIsFetching}
			/>
		</div>
	)
})
