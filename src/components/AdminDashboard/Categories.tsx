import {DeleteOutlined} from '@ant-design/icons'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {adminAPI} from '../../api/admin'
import adminState from '../../store/adminState'
import appState from '../../store/appState'
import {categoriesQuery} from '../../utils/helpers'
import {observer} from 'mobx-react-lite'
import s from './AdminDashboard.module.css'
import {Button, Card, Empty, message} from 'antd'

export const Categories: FC = observer(() => {
	const onDelete = async (id: number) => {
		appState.setIsLoading(true)
		const {status} = await adminAPI.deleteCategory(id)
		appState.setIsLoading(false)
		if (status) {
			message.success('category was deleted successfully')
			adminState.setCategories([])
			await adminState.fetchCategories()
		} else {
			message.error('can not delete category')
		}
	}

	return adminState.categories.length ? (
		<div className={s.grid}>
			{adminState.categories.map(({id, name}) => (
				<div key={id} className={s.card}>
					<Link to={`/by-categories?${categoriesQuery(name)}`}>{name}</Link>
					<div>
						<Button icon={<DeleteOutlined/>} danger className={s.close} type='link'
							onClick={onDelete.bind(null, id)} loading={appState.isLoading}
						/>
					</div>
				</div>
			))}
		</div>
	) : (
		<Card>
			<Empty className={s.empty} description='No Categories'/>
		</Card>
	)
})
