import {Dispatch, FC, SetStateAction} from 'react'

import {CategoriesSearch} from '../Actions/CategoriesSearch'
import Modal from 'antd/lib/modal/Modal'

type Props = {
	modalVisible: boolean
	setModalVisible: Dispatch<SetStateAction<boolean>>
}

export const CategoriesModal: FC<Props> = ({modalVisible, setModalVisible}) => {
	const closeModel = () => {
		setModalVisible(false)
	}

	return (
		<Modal title='Search by Categories' visible={modalVisible} footer={null} onCancel={closeModel}>
			<CategoriesSearch closeModal={closeModel} mobile/>
		</Modal>
	)
}
