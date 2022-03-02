import {makeAutoObservable} from 'mobx'
import {ICategory, IPost, IReaction} from '../types'
import {getRating, groupBy} from '../utils/helpers'
import appState from './appState'
import {postsAPI} from '../api/posts'
import commentsState from './commentsState'

class PostsState {
	posts: IPost[]
	editing: IPost | null
	allCategories: ICategory[]
	selectedCategories: string[]

	constructor() {
		makeAutoObservable(this)
		this.posts = []
		this.editing = null
		this.allCategories = []
		this.selectedCategories = []
	}

	setAllPosts(posts: IPost[] | null) {
		this.posts = posts || []
	}

	setPost(post: IPost | null) {
		this.posts = post ? [post] : []
	}

	setEditing(post: IPost | null) {
		this.editing = post
	}

	setAllCategories(categories: ICategory[] | null) {
		this.allCategories = categories || []
	}

	setSelectedCategories(categories: string[] | null) {
		this.selectedCategories = categories || []
	}

	setPostRating(post: IPost, userRating: IReaction, postRating: number) {
		post.userRating = userRating
		post.postRating = postRating
	}

	async fetchAllPosts() {
		appState.setIsLoading(true)
		const {data, status} = await postsAPI.fetchAllPosts()
		appState.setIsLoading(false)
		if (status) {
			this.setAllPosts(data)
		}
	}

	async fetchUserPosts(userId: number) {
		appState.setIsLoading(true)
		const {data, status} = await postsAPI.fetchUserPosts(userId)
		appState.setIsLoading(false)
		if (status) {
			this.setAllPosts(data)
			commentsState.setAllComments([])
		}
	}

	async fetchRatedPosts(userId: number, userRating: boolean) {
		appState.setIsLoading(true)
		const {data, status} = await postsAPI.fetchRatedPosts(userId, userRating)
		appState.setIsLoading(false)
		if (status) {
			this.setAllPosts(data)
			commentsState.setAllComments([])
		}
	}

	async fetchPost(postId: number) {
		appState.setIsLoading(true)
		const {data, status} = await postsAPI.fetchPost(postId)
		appState.setIsLoading(false)
		if (status) {
			this.setPost(data)
		}
		return status
	}

	async fetchPostsByCategories(categories: string[]) {
		appState.setIsLoading(true)
		const {data, status} = await postsAPI.fetchPostsByCategories(categories)
		appState.setIsLoading(false)
		if (status) {
			this.setAllPosts(data)
		}
	}

	async fetchCommentedPosts(userId: number) {
		appState.setIsLoading(true)
		const {data, status} = await postsAPI.fetchCommentedPosts(userId)
		appState.setIsLoading(false)
		if (status) {
			const commentsByPostId = groupBy('postId')(data)
			const posts = []
			for (const postId in commentsByPostId) {
				if (commentsByPostId.hasOwnProperty(postId)) {
					const {data, status} = await postsAPI.fetchPost(+postId)
					if (status) {
						posts.push(data)
					}
				}
			}
			this.setAllPosts(posts)
			commentsState.setUserComments(commentsByPostId)
		}
	}

	async deletePost(postId: number) {
		appState.setIsLoading(true)
		const {status} = await postsAPI.deletePost(postId)
		appState.setIsLoading(false)
		if (status) {
			const filteredPosts = this.posts.filter(({id}) => postId !== id)
			this.setAllPosts(filteredPosts)
			commentsState.setAllComments([])
		}
		return status
	}

	async setRating(post: IPost, reaction: IReaction) {
		appState.setIsLoading(true)
		const {status} = await postsAPI.ratePost(post.id, reaction)
		appState.setIsLoading(false)
		if (status) {
			const [userRating, postRating] = getRating(post.userRating, post.postRating, reaction)
			this.setPostRating(post, userRating, postRating)
		}
		return status
	}

	async fetchAllCategories() {
		appState.setIsLoading(true)
		const {data, status} = await postsAPI.fetchCategories()
		appState.setIsLoading(false)
		if (status) {
			this.setAllCategories(data)
		}
	}

	async fetchEditing(postId: number) {
		if (isNaN(postId)) {
			return
		}
		appState.setIsLoading(true)
		const {data, status} = await postsAPI.fetchPost(postId)
		appState.setIsLoading(false)
		if (status) {
			this.setEditing(data)
		}
	}
}

export default new PostsState()
