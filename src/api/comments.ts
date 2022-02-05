import {ApiPromise, IReaction} from '../types'
import {defaultAxios} from './index'

const fetchComments = (postId: number): ApiPromise => defaultAxios.post('comment/filter', {
	option: 'post',
	postId,
})

const createComment = (postId: number, content: string): ApiPromise => defaultAxios.post('comment/create', {
	postId,
	content,
})

const deleteComment = (commentId: number): ApiPromise => defaultAxios.delete(`comment/delete/${commentId}`)

const editComment = (id: number, authorId: number, postId: number,
                     content: string): ApiPromise => defaultAxios.put('comment/edit', {
	id,
	authorId,
	postId,
	content,
})

const rateComment = (commentId: number, postId: number, reaction: IReaction) => defaultAxios.post('comment/rate', {
	commentId,
	postId,
	reaction,
})

export const commentsAPI = {
	fetchComments,
	createComment,
	deleteComment,
	editComment,
	rateComment,
}
