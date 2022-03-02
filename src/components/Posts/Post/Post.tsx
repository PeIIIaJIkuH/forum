import {IComment, IPost} from '../../../types'
import {Categories} from './Categories'
import {Comments} from '../Comments'
import {Content} from './Content'
import {FC} from 'react'
import {Footer} from './Footer'
import {Header} from './Header'
import {PROTOCOL} from '../../../api'
import {Rate} from './Rate'
import {observer} from 'mobx-react-lite'
import s from '../Posts.module.css'
import {Card, Divider, Image} from 'antd'

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
				{post.isImage && (
					<Image src={`${PROTOCOL}://${post.imagePath}`} alt='post image' preview={false}/>
				)}
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
