import { FC } from 'react'

import CategoryItem from '@components/pages/admin/category/list/Category-item'
import Loader from '@components/ui/loader/Loader'

import { ICategory } from '@common-types/category.types'

import styles from '@styles/admin/admin-page.style.module.scss'

interface Props {
	categories?: ICategory[]
	isLoading: boolean
}

const CategoryList: FC<Props> = ({ isLoading, categories }) => {
	if (isLoading) {
		return <Loader text={'Загрузка'} size={'large'} />
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
