import {DownOutlined, UpOutlined} from '@ant-design/icons'
import {FC, useRef} from 'react'

import Button from 'antd/lib/button'
import {IPost} from '../../../types'
import appState from '../../../store/appState'
import authState from '../../../store/authState'
import cx from 'classnames'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'
import postsState from '../../../store/postsState'
import s from '../Posts.module.css'

type Props = {
	post: IPost
}

export const Rate: FC<Props> = observer(({post}) => {
	const isRatedUp = post.userRating === 1
	const isRatedDown = post.userRating === -1
	const upRef = useRef<HTMLDivElement>(null)
	const downRef = useRef<HTMLDivElement>(null)

	const onUpClick = () => {
		appState.setIsLoading(true)
		const status = postsState.setRating(post, 1)
		if (upRef.current) {
			upRef.current.blur()
		}
		appState.setIsLoading(false)
		if (!status) {
			message.error('can not rate post').then()
		}
	}

	const onDownClick = () => {
		appState.setIsLoading(true)
		const status = postsState.setRating(post, -1)
		if (downRef.current) {
			downRef.current.blur()
		}
		appState.setIsLoading(false)
		if (!status) {
			message.error('can not rate post').then()
		}
	}

	return (
		<div className={s.rating}>
			<Button className={cx(s.up, isRatedUp && s.ratedUp)} icon={<UpOutlined/>} ref={upRef}
				disabled={!authState.user?.id} onClick={onUpClick} loading={appState.isLoading}
			/>
			<div className={s.ratingNumber}>
				{post.postRating}
			</div>
			<Button className={cx(s.down, isRatedDown && s.ratedDown)} icon={<DownOutlined/>} ref={downRef}
				disabled={!authState.user?.id} onClick={onDownClick} loading={appState.isLoading}
			/>
		</div>
	)
})
