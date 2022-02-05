import React, {FC, useEffect} from 'react'
import Tabs from 'antd/lib/tabs'
import {Helmet} from 'react-helmet'
import s from './AdminDashboard.module.css'
import adminState from '../../store/adminState'
import authState from '../../store/authState'
import {Error403} from '../common/errors/Error403'
import {observer} from 'mobx-react-lite'
import {Requests} from './Requests'
import {EUserRole} from '../../types'
import {Reports} from './Reports'
import {Categories} from './Categories'
import {Moderators} from './Moderators'
import queryString from 'query-string'
import {useHistory, useLocation} from 'react-router-dom'

const {TabPane} = Tabs

export const AdminDashboard: FC = observer(() => {
	const location = useLocation()
	const parsed = queryString.parse(location.search)
	const history = useHistory()

	const getTab = (name: string) => (
		<div className={s.tab}>
			{name}
		</div>
	)

	const onChange = (key: string) => {
		history.push({
			search: queryString.stringify({type: key}),
		})
	}

	useEffect(() => {
		adminState.fetchAll().then()
	}, [])

	if (!authState.user || authState.role !== EUserRole.admin) {
		return <Error403/>
	}

	const getCorrectType = (type: string | string[] | null): string => {
		if (type === 'requests' || type === 'reports' || type === 'moderators' || type === 'categories') {
			return type
		}
		return 'requests'
	}

	return (
		<>
			<Helmet><title>Admin Dashboard | forume</title></Helmet>
			<Tabs centered defaultActiveKey={getCorrectType(parsed.type)} onChange={onChange}>
				<TabPane tab={getTab('Requests')} key='requests'>
					<Requests/>
				</TabPane>
				<TabPane tab={getTab('Reports')} key='reports'>
					<Reports/>
				</TabPane>
				<TabPane tab={getTab('Moderators')} key='moderators'>
					<Moderators/>
				</TabPane>
				<TabPane tab={getTab('Categories')} key='categories'>
					<Categories/>
				</TabPane>
			</Tabs>
		</>
	)
})
