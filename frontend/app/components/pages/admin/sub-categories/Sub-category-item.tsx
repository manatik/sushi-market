import { ISubCategory } from '@common-types/sub-category.types'
import SubCategoryContextMenu from '@components/pages/admin/create/sub-category/Sub-category-context-menu'
import useConfirm from '@hooks/useConfirm'
import { booleanYesOrNot, dateToFormatDate } from '@utils/utils'
import React, { FC } from 'react'
import styles from './sub-categories.style.module.scss'

interface Props {
	subCategory: ISubCategory
}

const SubCategoryItem: FC<Props> = ({ subCategory }) => {
	const { Dialog, onConfirm } = useConfirm(
		'Вы уверены?',
		`Удалить категорию - ${subCategory.name}?`
	)

	return (
		<SubCategoryContextMenu subCategory={subCategory} confirm={onConfirm}>
			<Dialog />
			<div className={styles.subCategoryRow}>
				<span className={styles.subCategoryRow__cell}>{subCategory.name}</span>
				<span className={styles.subCategoryRow__cell}>{subCategory.article}</span>
				<span className={styles.subCategoryRow__cell}>{subCategory.category.name}</span>
				<span className={styles.subCategoryRow__cell}>{booleanYesOrNot(subCategory.hidden)}</span>
				<span className={styles.subCategoryRow__cell}>{subCategory.orderBy}</span>
				<span className={styles.subCategoryRow__cell}>
					{dateToFormatDate(subCategory.dateCreated)}
				</span>
				<span className={styles.subCategoryRow__cell}>
					{subCategory.dateUpdated ? dateToFormatDate(subCategory.dateUpdated) : ''}
				</span>
			</div>
		</SubCategoryContextMenu>
	)
}

export default SubCategoryItem
