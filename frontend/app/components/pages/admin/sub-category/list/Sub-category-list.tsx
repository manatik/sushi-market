import React, { FC } from 'react'

import SubCategoryItem from '@components/pages/admin/sub-category/list/Sub-category-item'
import Loader from '@components/ui/loader/Loader'

import { ISubCategory } from '@common-types/sub-category.types'

import styles from '@styles/admin/admin-page.style.module.scss'

interface Props {
	subCategories?: ISubCategory[]
	isLoading: boolean
}

const SubCategoryList: FC<Props> = ({ isLoading, subCategories }) => {
	if (isLoading) {
		return <Loader text={'Загрузка'} size={'large'} />
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
