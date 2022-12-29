import { ICategory } from '@common-types/category.types'
import Dialog from '@components/ui/dialog/Dialog'
import { FC } from 'react'

interface Props {
	category: ICategory
	isOpen: boolean
	onClose: () => void
}

const UpdateCategory: FC<Props> = ({ category, isOpen, onClose }) => {
	return (
		<Dialog isOpen={isOpen} onClose={onClose}>
			<div>{category.id}</div>
		</Dialog>
	)
}

export default UpdateCategory
