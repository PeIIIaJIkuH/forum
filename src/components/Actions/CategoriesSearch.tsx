import React, {FC, useState} from 'react'
import s from './Actions.module.css'
import {CategoriesSearchForm} from './CategoriesSearchForm'
import Card from 'antd/lib/card'
import message from 'antd/lib/message'
import {useForm} from 'antd/lib/form/Form'
import {useHistory} from 'react-router-dom'
import {categoriesQuery} from '../../utils/helpers'
import {observer} from 'mobx-react-lite'
import appState from '../../store/appState'

type Props = {
	closeModal?: () => void
	mobile?: boolean
}

export const CategoriesSearch: FC<Props> = observer(({closeModal, mobile}) => {
	const history = useHistory()
	const [isFetching, setIsFetching] = useState(false)
	const [form] = useForm()

	type obj = { categories: string[] }
	const onSubmit = async ({categories}: obj) => {
		if (mobile && closeModal) {
			closeModal()
		}
		appState.setIsMenuOpen(false)
		if (!categories || !categories.length) {
			message.warning('Choose at least one category!')
		} else {
			form.resetFields()
			setIsFetching(true)
			const query = categoriesQuery(categories)
			history.push(`/by-categories?${query}`)
			setIsFetching(false)
		}
	}

	return (
		<Card className={s.card}>
			<CategoriesSearchForm onSubmit={onSubmit} form={form} isFetching={isFetching}/>
		</Card>
	)
})
