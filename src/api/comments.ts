import {ApiPromise, IReaction} from '../types'
import {updatingAxios} from './index'

const fetchComments = (postId: number): ApiPromise => updatingAxios.post('comment/filter', {
	option: 'post',
	postId,
})

const createComment = (postId: number, content: string): ApiPromise => updatingAxios.post('comment/create', {
	postId,
	content,
})

const deleteComment = (commentId: number): ApiPromise => updatingAxios.delete(`comment/delete/${commentId}`)

const editComment = (id: number, authorId: number, postId: number,
                     content: string): ApiPromise => updatingAxios.put('comment/edit', {
	id,
	authorId,
	postId,
	content,
})

const rateComment = (commentId: number, postId: number, reaction: IReaction) => updatingAxios.post('comment/rate', {
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
