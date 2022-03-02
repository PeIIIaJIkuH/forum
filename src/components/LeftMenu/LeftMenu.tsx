import {DislikeOutlined, FormOutlined, HomeOutlined, LikeOutlined, TagsOutlined, UserOutlined} from '@ant-design/icons'
import {FC, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {CategoriesModal} from './CategoriesModal'
import {MenuItem} from './MenuItem'
import authState from '../../store/authState'
import {observer} from 'mobx-react-lite'
import {Menu} from 'antd'

type Props = {
	mobile?: boolean
}

export const LeftMenu: FC<Props> = observer(({mobile}) => {
	const location = useLocation()
	const history = useHistory()
	const path = location.pathname.split('/')[1] || 'home'
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
		<Menu mode='inline' defaultSelectedKeys={defaultKeys} selectedKeys={[path]} onClick={onClick}>
			<MenuItem key='home' title='Home' icon={<HomeOutlined/>} isAuth={!!authState.user} forAll available/>
			<MenuItem key='my' title='My Posts' icon={<UserOutlined/>} isAuth={!!authState.user} available/>
			<MenuItem key='up-voted' title='Upvoted Posts' icon={<LikeOutlined/>} isAuth={!!authState.user} available/>
			<MenuItem key='down-voted' title='Downvoted Posts' icon={<DislikeOutlined/>} isAuth={!!authState.user}
				available
			/>
			{mobile && (
				<>
					<MenuItem key='by-categories' title='By Categories' available forAll={mobile}
						icon={<TagsOutlined/>}
					/>
					<CategoriesModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
					<MenuItem key='create' title='Create Post' available={mobile} forAll={mobile}
						icon={<FormOutlined/>}
					/>
				</>
			)}
		</Menu>
	)
})
