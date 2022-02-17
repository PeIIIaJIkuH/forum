import {FC, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'

import {Categories} from './Categories'
import {EUserRole} from '../../types'
import {Error403} from '../common/errors/Error403'
import {Helmet} from 'react-helmet'
import {Moderators} from './Moderators'
import {Reports} from './Reports'
import {Requests} from './Requests'
import Tabs from 'antd/lib/tabs'
import adminState from '../../store/adminState'
import authState from '../../store/authState'
import {observer} from 'mobx-react-lite'
import queryString from 'query-string'
import s from './AdminDashboard.module.css'

const {TabPane} = Tabs

export const AdminDashboard: FC = observer(() => {
	const location = useLocation()
	const parsed = queryString.parse(location.search)
	const history = useHistory()

	const getTab = (name: string) => <div className={s.tab}>{name}</div>

	const onChange = (key: string) => {
		history.push({
			search: queryString.stringify({type: key}),
		})
	}

	useEffect(() => {
		adminState.fetchAll().then()
	}, [])

	if (!authState.user || authState.role !== EUserRole.admin) {
		return <Error403 />
	}

	const getCorrectType = (type: string | string[] | null): string => {
		if (type === 'requests' || type === 'reports' || type === 'moderators' || type === 'categories') {
			return type
		}
		return 'requests'
	}

	return (
		<>
			<Helmet>
				<title>Admin Dashboard | forume</title>
			</Helmet>
			<Tabs centered defaultActiveKey={getCorrectType(parsed.type)} onChange={onChange}>
				<TabPane tab={getTab('Requests')} key='requests'>
					<Requests />
				</TabPane>
				<TabPane tab={getTab('Reports')} key='reports'>
					<Reports />
				</TabPane>
				<TabPane tab={getTab('Moderators')} key='moderators'>
					<Moderators />
				</TabPane>
				<TabPane tab={getTab('Categories')} key='categories'>
					<Categories />
				</TabPane>
			</Tabs>
		</>
	)
})
