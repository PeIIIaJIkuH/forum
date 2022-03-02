import {FC, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {Categories} from './Categories'
import {EUserRole} from '../../types'
import {Error403} from '../common/errors/Error403'
import {Helmet} from 'react-helmet'
import {Moderators} from './Moderators'
import {Reports} from './Reports'
import {Requests} from './Requests'
import adminState from '../../store/adminState'
import authState from '../../store/authState'
import {observer} from 'mobx-react-lite'
import queryString from 'query-string'
import s from './AdminDashboard.module.css'
import {Badge, Tabs} from 'antd'

export const AdminDashboard: FC = observer(() => {
	const location = useLocation()
	const parsed = queryString.parse(location.search)
	const history = useHistory()

	const getTab = (name: string, count?: number) => count ? (
		<Badge count={count} size='small' offset={[0, -5]} overflowCount={10}>
			<div className={s.tab}>{name}</div>
		</Badge>
	) : (
		<div className={s.tab}>{name}</div>
	)

	const onChange = (key: string) => {
		history.push({search: queryString.stringify({type: key})})
	}

	useEffect(() => {
		if (parsed.type === 'requests') {
			adminState.fetchRequests().then()
		} else if (parsed.type === 'reports') {
			adminState.fetchReports().then()
		} else if (parsed.type === 'moderators') {
			adminState.fetchModerators().then()
		} else if (parsed.type === 'categories') {
			adminState.fetchCategories().then()
		}
	}, [parsed.type])

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
			<Helmet>
				<title>Admin Dashboard | forume</title>
			</Helmet>
			<Tabs centered defaultActiveKey={getCorrectType(parsed.type)} onChange={onChange}>
				<Tabs.TabPane tab={getTab('Requests', adminState.requests.length)} key='requests'>
					<Requests/>
				</Tabs.TabPane>
				<Tabs.TabPane tab={getTab('Reports', adminState.reports.length)} key='reports'>
					<Reports/>
				</Tabs.TabPane>
				<Tabs.TabPane tab={getTab('Moderators')} key='moderators'>
					<Moderators/>
				</Tabs.TabPane>
				<Tabs.TabPane tab={getTab('Categories')} key='categories'>
					<Categories/>
				</Tabs.TabPane>
			</Tabs>
		</>
	)
})
