import {makeAutoObservable} from 'mobx'
import {IComment, IReaction} from '../types'
import appState from './appState'
import {commentsAPI} from '../api/comments'
import {getRating} from '../utils/helpers'
import {adminAPI} from '../api/admin'

class CommentsState {
	allComments: IComment[]
	userComments: Record<string, IComment[]>

	constructor() {
		makeAutoObservable(this)
		this.allComments = []
		this.userComments = {}
	}

	setAllComments(comments: IComment[] | null) {
		this.allComments = comments || []
	}

	setUserComments(comments: Record<string, IComment[]>) {
		this.userComments = comments
	}

	setPostComments(comments: IComment[], postId: number) {
		this.userComments[postId] = comments
	}

	setRating(comment: IComment, userRating: IReaction, commentRating: number) {
		comment.userRating = userRating
		comment.commentRating = commentRating
	}

	setContent(comment: IComment, content: string) {
		comment.content = content
	}

	async fetchComments(postId: number) {
		appState.setIsLoading(true)
		const {data, status} = await commentsAPI.fetchComments(postId)
		appState.setIsLoading(false)
		if (status) {
			this.setAllComments(data)
		}
	}

	async deleteComment(commentId: number, options: { postId?: number, isAdmin?: boolean } = {}) {
		const {isAdmin, postId} = options
		appState.setIsLoading(true)
		let status: boolean
		if (!isAdmin) {
			status = (await commentsAPI.deleteComment(commentId)).status
		} else {
			status = (await adminAPI.deleteComment(commentId)).status
		}
		appState.setIsLoading(false)
		if (status) {
			if (!postId) {
				const filteredComments = this.allComments.filter(({id}) => id !== commentId)
				this.setAllComments(filteredComments)
			} else {
				this.setPostComments(this.userComments[postId].filter(({id}) => id !== commentId), postId)
			}
		}
		return status
	}

	async editComment(comment: IComment, content: string) {
		appState.setIsLoading(true)
		const {status} = await commentsAPI.editComment(comment.id, comment.author.id, comment.postId, content)
		appState.setIsLoading(false)
		if (status) {
			this.setContent(comment, content)
		}
		return status
	}

	async setCommentRating(comment: IComment, reaction: IReaction) {
		appState.setIsLoading(true)
		const {status} = await commentsAPI.rateComment(comment.id, comment.postId, reaction)
		appState.setIsLoading(false)
		if (status) {
			const [userRating, commentRating] = getRating(comment.userRating, comment.commentRating, reaction)
			this.setRating(comment, userRating, commentRating)
		}
		return status
	}
}

export default new CommentsState()
