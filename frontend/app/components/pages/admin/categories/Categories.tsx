import CategoryItem from '@components/pages/admin/categories/Category-item'
import Switch from '@components/ui/switch/Switch'
import { useCategories } from '@query-hooks/useCategories'
import * as Label from '@radix-ui/react-label'
import { useState } from 'react'
import styles from './categories.style.module.scss'

const Categories = () => {
	const [isOnlyHidden, setIsOnlyHidden] = useState(false)

	const { isLoading, data: categories } = useCategories(isOnlyHidden)

	if (isLoading) {
		return <div>loading...</div>
	}

	return (
		<div className={styles.categories}>
			<div className={styles.controls}>
				<div className={styles.controls__hidden}>
					<Label.Root htmlFor='hidden'>Скрытые</Label.Root>

					<Switch
						id='hidden'
						onCheckedChange={checked => setIsOnlyHidden(checked)}
						checked={isOnlyHidden}
					/>
				</div>
			</div>

			<div className={styles.cards}>
				{categories?.map(category => (
					<CategoryItem key={category.id} category={category} />
				))}
			</div>
		</div>
	)
}

export default Categories
