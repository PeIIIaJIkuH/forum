import React, {FC, useState} from 'react'
import s from './Header.module.css'
import Popover from 'antd/lib/popover'
import Button from 'antd/lib/button'
import {BellOutlined, DeleteOutlined} from '@ant-design/icons'
import Badge from 'antd/lib/badge'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'
import userState from '../../store/userState'
import Tabs from 'antd/lib/tabs'
import {DefaultNotifications} from './DefaultNotifications'
import {RoleNotifications} from './RoleNotifications'
import {ReportNotifications} from './ReportNotifications'
import {PostNotifications} from './PostNotifications'
import appState from '../../store/appState'

const {TabPane} = Tabs

export const Notifications: FC = observer(() => {
	const [visible, setVisible] = useState(false)

	const handleVisibleChange = (visible: boolean) => {
		setVisible(visible)
	}

	const onDelete = async () => {
		appState.setIsLoading(true)
		const status = await userState.deleteAllNotifications()
		appState.setIsLoading(false)
		setVisible(false)
		if (status) {
			message.success('notifications were deleted successfully')
		} else {
			message.error('can not delete notifications')
		}
	}

	const deleteButton = (
		<Button type='text' size='small' loading={appState.isLoading} disabled={!userState.defaultNotifications}
		        icon={<DeleteOutlined className={s.closeIcon}/>} danger onClick={onDelete}
		/>
	)

	const getTab = (name: string, count: number) => (
		<Badge count={count} size='small' offset={[0, -5]}>
			<div className={s.tab}>
				{name}
			</div>
		</Badge>
	)

	const content = (
		<Tabs centered className={s.tabs} tabBarExtraContent={deleteButton}>
			<TabPane tab={getTab('Default', userState.defaultNotifications.length)} key='default'>
				<DefaultNotifications/>
			</TabPane>
			<TabPane tab={getTab('Requests', userState.roleNotifications.length)} key='requests'>
				<RoleNotifications/>
			</TabPane>
			<TabPane tab={getTab('Reports', userState.reportNotifications.length)} key='reports'>
				<ReportNotifications/>
			</TabPane>
			<TabPane tab={getTab('Posts', userState.postNotifications.length)} key='posts'>
				<PostNotifications/>
			</TabPane>
		</Tabs>
	)

	return (
		<Badge className={s.notifications} offset={[-5, 5]} size='small' overflowCount={10}
		       count={userState.getNotificationsCount()}
		>
			<Popover placement='bottom' trigger='click' onVisibleChange={handleVisibleChange} content={content}
			         overlayClassName={s.popoverNotifications} visible={visible}
			>
				<Button type='text' icon={<BellOutlined/>}/>
			</Popover>
		</Badge>
	)
})
