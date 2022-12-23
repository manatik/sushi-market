import CategoryItem from '@components/pages/admin/categories/Category-item'
import classNames from 'classnames'
import { useCategories } from '@query-hooks/useCategories'
import styles from './categories.style.module.scss'

const Categories = () => {
	const { isLoading, data: categories } = useCategories()

	if (isLoading) {
		return <div>loading...</div>
	}

	return (
		<div className={styles.categories}>
			<div className={classNames(styles.categoryRow, styles.categoryRow_header)}>
				<span>Наименование</span>
				<span>Артикул</span>
				<span>Код</span>
				<span>Скрыта</span>
				<span>Позиция</span>
				<span>Создана</span>
				<span>Обновлена</span>
			</div>
			{categories?.map(category => (
				<CategoryItem key={category.id} category={category} />
			))}
		</div>
	)
}

export default Categories
