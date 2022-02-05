import React, {FC} from 'react'
import s from '../Posts.module.css'
import Card from 'antd/lib/card'
import Divider from 'antd/lib/divider'
import {Rate} from './Rate'
import {Header} from './Header'
import {Content} from './Content'
import {Categories} from './Categories'
import {Footer} from './Footer'
import {IComment, IPost} from '../../../types'
import {Comments} from '../Comments'
import Image from 'antd/lib/image'
import {observer} from 'mobx-react-lite'
import {PROTOCOL} from '../../../api'

type Props = {
	post: IPost | null
	comments?: IComment[] | null
}

export const Post: FC<Props> = observer(({post, comments}) => {
	return post && (
		<Card className={s.post}>
			<Rate post={post}/>
			<div className={s.main}>
				<Header post={post}/>
				<Content content={post.content}/>
				{post.isImage && <Image src={`${PROTOCOL}://${post.imagePath}`} alt='post image' preview={false}/>}
				<Divider className={s.divider}/>
				<Categories categories={post.categories}/>
				<Footer post={post}/>
				{comments && (
					<>
						<Divider/>
						<Comments comments={comments} userPage/>
					</>
				)}
			</div>
		</Card>
	)
})
