import { ICategory } from '@common-types/category.types'
import CategoryItemContextMenu from '@components/pages/admin/categories/Category-item-context-menu'
import { dateToFormatDate } from '@utils/utils'
import React, { FC } from 'react'
import styles from './categories.style.module.scss'

interface Props {
	category: ICategory
}

const CategoryItem: FC<Props> = ({ category }) => {
	return (
		<CategoryItemContextMenu category={category}>
			<div className={styles.categoryRow}>
				<span className={styles.categoryRow__cell}>{category.name}</span>
				<span className={styles.categoryRow__cell}>{category.article}</span>
				<span className={styles.categoryRow__cell}>{category.code}</span>
				<span className={styles.categoryRow__cell}>{category.orderBy}</span>
				<span className={styles.categoryRow__cell}>{dateToFormatDate(category.dateCreated)}</span>
				<span className={styles.categoryRow__cell}>{dateToFormatDate(category.dateUpdated)}</span>
			</div>
		</CategoryItemContextMenu>
	)
}

export default CategoryItem
