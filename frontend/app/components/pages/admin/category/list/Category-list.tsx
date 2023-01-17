import { ICategory } from '@common-types/category.types'
import { FC } from 'react'
import styles from '@styles/admin/admin-page.style.module.scss'
import CategoryItem from '@components/pages/admin/category/list/Category-item'

interface Props {
	categories?: ICategory[]
	isLoading: boolean
}

const CategoryList: FC<Props> = ({ isLoading, categories }) => {
	if (isLoading) {
		return <div>loading...</div>
	}

	if (!categories?.length) {
		return <div className={styles.cards}>Ничего не найдено</div>
	}

	return (
		<div className={styles.cards}>
			{categories?.map(category => (
				<CategoryItem key={category.id} category={category} />
			))}
		</div>
	)
}

export default CategoryList
