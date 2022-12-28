import { ISubCategory } from '@common-types/sub-category.types'
import styles from './sub-categories.style.module.scss'
import SubCategoryItem from '@components/pages/admin/sub-categories/Sub-category-item'
import { FC } from 'react'

interface Props {
	subCategories?: ISubCategory[]
	isLoading: boolean
}

const SubCategoryList: FC<Props> = ({ isLoading, subCategories }) => {
	if (isLoading) {
		return <div>loading...</div>
	}

	if (!subCategories?.length) {
		return <div className={styles.cards}>Ничего не найдено</div>
	}

	return (
		<div className={styles.cards}>
			{subCategories?.map(subCategory => (
				<SubCategoryItem key={subCategory.id} subCategory={subCategory} />
			))}
		</div>
	)
}

export default SubCategoryList
