import { ICategory } from '@common-types/category.types'
import ContextMenu from '@components/ui/context-menu/Context-menu'
import Link from '@components/ui/link/Link'
import Separator from '@components/ui/separator/Separator'
import useConfirm from '@hooks/useConfirm'
import { useRemoveCategory, useUpdateCategory } from '@query-hooks/useCategories'
import {
	CREATE_CATEGORY_PATH,
	CREATE_PRODUCT_PATH,
	CREATE_SUB_CATEGORY_PATH
} from '@utils/pages-paths'
import { FC, PropsWithChildren } from 'react'

interface Props {
	category: ICategory
}

const CategoryItemContextMenu: FC<PropsWithChildren<Props>> = ({ children, category }) => {
	const { Dialog, onConfirm } = useConfirm(
		'Вы уверены?',
		<div>
			<b>Удалить категорию - {category.name}?</b>
			<p>Вместе с ней удалятся и связанные с ней подкатегории!</p>
			<p>Продукты затронуты не будут</p>
		</div>
	)
	const { mutate: removeCategory } = useRemoveCategory()
	const { mutate: updateCategory } = useUpdateCategory()

	const isHiddenCategory = !!category.dateDeleted

	const onRemove = async () => {
		const isConfirmed = await onConfirm()

		if (isConfirmed) {
			removeCategory({ id: category.id, hard: true })
		}
	}

	const onHide = (hidden: boolean) => {
		if (hidden) {
			updateCategory({ id: category.id, dto: { hidden: false, article: category.article } })
		} else {
			removeCategory({ id: category.id, hard: false })
		}
	}

	return (
		<>
			<Dialog />

			<ContextMenu>
				<ContextMenu.Title>{children}</ContextMenu.Title>

				<ContextMenu.Content>
					<ContextMenu.Item>Подробнее</ContextMenu.Item>

					<ContextMenu.Item>
						<Link href={CREATE_CATEGORY_PATH}>Создать категорию</Link>
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link href={{ pathname: CREATE_SUB_CATEGORY_PATH, query: { categoryId: category.id } }}>
							Добавить подкатегорию
						</Link>
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link href={{ pathname: CREATE_PRODUCT_PATH, query: { categoryId: category.id } }}>
							Добавить продукт
						</Link>
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item>Редактировать</ContextMenu.Item>

					<ContextMenu.Item onClick={() => onHide(isHiddenCategory)}>
						{isHiddenCategory ? 'Вернуть' : 'Скрыть'}
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={onRemove}>Удалить</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu>
		</>
	)
}

export default CategoryItemContextMenu
