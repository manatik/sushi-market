import CategoryItem from '@components/pages/admin/categories/Category-item'
import CategoryItemContextMenu from '@components/pages/admin/categories/Category-item-context-menu'
import Separator from '@components/ui/separator/Separator'
import Switch from '@components/ui/switch/Switch'
import * as Label from '@radix-ui/react-label'
import { dateToFormatDate } from '@utils/utils'
import classNames from 'classnames'
import { useCategories } from '@query-hooks/useCategories'
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
			<div className={styles.categories__controls}>
				<div className={styles.hidden}>
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
					<CategoryItemContextMenu category={category}>
						<div key={category.id} className={styles.card}>
							<div className={styles.cardHeader}>
								<div className={styles.cardTitles}>
									<span className={styles.cardTitles__title}>{category.name}</span>
									<span className={styles.cardTitles__subTitle}>{category.article}</span>
								</div>

								{/*<div className={styles.cardTitles}>*/}
								{/*	<span className={styles.cardTitles__subTitle}>*/}
								{/*		{dateToFormatDate(category.dateUpdated)}*/}
								{/*	</span>*/}
								{/*</div>*/}
							</div>

							<Separator />

							<div className={styles.cardContent}>
								<div className={styles.cardContent__item}>
									<span>Код</span>
									<span>{category.code}</span>
								</div>

								<div className={styles.cardContent__item}>
									<span>Позиция</span>
									<span>{category.orderBy}</span>
								</div>
							</div>

							<div className={styles.cardFooter}>
								<span
									className={classNames(
										styles.cardFooter__item,
										styles.cardFooter__item_alignEnd,
										styles.cardFooter__item_small
									)}
								>
									{dateToFormatDate(category.dateUpdated)}
								</span>
							</div>
						</div>
					</CategoryItemContextMenu>
				))}
			</div>

			{/*<div className={classNames(styles.categoryRow, styles.categoryRow_header)}>*/}
			{/*	<span>Наименование</span>*/}
			{/*	<span>Артикул</span>*/}
			{/*	<span>Код</span>*/}
			{/*	<span>Позиция</span>*/}
			{/*	<span>Создана</span>*/}
			{/*	<span>Обновлена</span>*/}
			{/*</div>*/}

			{/*{categories?.map(category => (*/}
			{/*	<CategoryItem key={category.id} category={category} />*/}
			{/*))}*/}
		</div>
	)
}

export default Categories
