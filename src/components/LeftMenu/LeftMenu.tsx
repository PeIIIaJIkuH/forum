import {DislikeOutlined, FormOutlined, HomeOutlined, LikeOutlined, TagsOutlined, UserOutlined} from '@ant-design/icons'
import {FC, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'

import {CategoriesModal} from './CategoriesModal'
import Menu from 'antd/lib/menu'
import {MenuItem} from './MenuItem'
import authState from '../../store/authState'
import {observer} from 'mobx-react-lite'

type Props = {
	mobile?: boolean
}

export const LeftMenu: FC<Props> = observer(({mobile}) => {
	const location = useLocation()
	const history = useHistory()
	const options = [location.pathname.split('/')[1] || 'home']
	const [modalVisible, setModalVisible] = useState(false)
	const defaultKeys = ['home']

	const onClick = ({key}: any) => {
		if (key !== 'by-categories') {
			history.push(`/${key === 'home' ? '' : key}`)
		} else {
			setModalVisible(true)
		}
	}

	return (
		<Menu mode='inline' defaultSelectedKeys={defaultKeys} selectedKeys={options} onClick={onClick}>
			<MenuItem key='home' title='Home' icon={<HomeOutlined/>} isAuth={!!authState.user} forAll available/>
			<MenuItem key='my' title='My Posts' icon={<UserOutlined/>} isAuth={!!authState.user} available/>
			<MenuItem key='up-voted' title='Upvoted Posts' icon={<LikeOutlined/>} isAuth={!!authState.user} available/>
			<MenuItem key='down-voted' title='Downvoted Posts' icon={
				<DislikeOutlined/>} isAuth={!!authState.user} available
			/>
			{mobile && (
				<>
					<MenuItem key='by-categories' title='By Categories' icon={
						<TagsOutlined/>} available forAll={mobile}
					/>
					<CategoriesModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
					<MenuItem key='create' title='Create Post' icon={
						<FormOutlined/>} forAll={mobile} available={mobile}
					/>
				</>
			)}
		</Menu>
	)
})
