import Button from 'antd/lib/button'
import {CategoriesSearch} from './CategoriesSearch'
import {FC} from 'react'
import Layout from 'antd/lib/layout'
import {Link} from 'react-router-dom'
import {PlusOutlined} from '@ant-design/icons'
import authState from '../../store/authState'
import {observer} from 'mobx-react-lite'
import postsState from '../../store/postsState'
import s from './Actions.module.css'

export const Actions: FC = observer(() => (
	<div className='actions'>
		<Link className={s.addPost} to='/create'>
			<Button type='primary' icon={<PlusOutlined />} disabled={!authState.user || !!postsState.editing}>
				Add post
			</Button>
		</Link>
		<div className={s.wrapper}>
			<CategoriesSearch />
		</div>
		<Layout.Footer className={s.footer}>
			<div>by PeIIIaJIkuH and indecember</div>
			<div>GO, React, SQLite3</div>
			<div>February, 2021</div>
		</Layout.Footer>
	</div>
))
