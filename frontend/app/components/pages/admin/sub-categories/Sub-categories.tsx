import SubCategoryItem from '@components/pages/admin/sub-categories/Sub-category-item'
import { useSubCategories } from '@query-hooks/useSubCategories'
import classNames from 'classnames'
import styles from './sub-categories.style.module.scss'

const SubCategories = () => {
	const { isLoading, data: subCategories } = useSubCategories()

	if (isLoading) {
		return <div>loading...</div>
	}

	return (
		<div className={styles.subCategories}>
			<div className={classNames(styles.subCategoryRow, styles.subCategoryRow_header)}>
				<span>Наименование</span>
				<span>Артикул</span>
				<span>Категория</span>
				<span>Скрыта</span>
				<span>Позиция</span>
				<span>Создана</span>
				<span>Обновлена</span>
			</div>
			{subCategories?.map(subCategory => (
				<SubCategoryItem key={subCategory.id} subCategory={subCategory} />
			))}
		</div>
	)
}

export default SubCategories
