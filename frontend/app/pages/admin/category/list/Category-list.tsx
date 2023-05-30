import { FC } from 'react'

import Loader from '@components/ui/loader/Loader'

import { ICategory } from '@common-types/category.types'

import CategoryItem from './Category-item'

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
