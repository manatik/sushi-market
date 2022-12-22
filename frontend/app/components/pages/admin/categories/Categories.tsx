import { ICategory, ICategoryResponse } from '@common-types/category.types'
import CategoryItem from '@components/pages/admin/categories/Category-item'
import { CategoryService } from '@services/category.service'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import classNames from 'classnames'
import styles from './categories.style.module.scss'

const Categories = () => {
	const { isLoading, data: categories } = useQuery<ICategoryResponse, AxiosError<any>, ICategory[]>(
		['categories'],
		CategoryService.all,
		{
			select: data => data.categories,
			refetchInterval: 15000
		}
	)

	if (isLoading) {
		return <div>loading...</div>
	}
	console.log(categories)
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
