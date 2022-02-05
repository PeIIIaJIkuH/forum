import React, {FC} from 'react'
import s from './Actions.module.css'
import Button from 'antd/lib/button'
import {PlusOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import Layout from 'antd/lib/layout'
import {CategoriesSearch} from './CategoriesSearch'
import {observer} from 'mobx-react-lite'
import authState from '../../store/authState'
import postsState from '../../store/postsState'

export const Actions: FC = observer(() => (
	<div className='actions'>
		<Link className={s.addPost} to='/create'>
			<Button type='primary' icon={<PlusOutlined/>} disabled={!authState.user || !!postsState.editing}>
				Add post
			</Button>
		</Link>
		<div className={s.wrapper}>
			<CategoriesSearch/>
		</div>
		<Layout.Footer className={s.footer}>
			<div>by PeIIIaJIkuH and indecember</div>
			<div>GO, React, SQLite3</div>
			<div>February, 2021</div>
		</Layout.Footer>
	</div>
))
