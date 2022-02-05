import React, {Dispatch, FC, SetStateAction} from 'react'
import Modal from 'antd/lib/modal/Modal'
import {CategoriesSearch} from '../Actions/CategoriesSearch'

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
