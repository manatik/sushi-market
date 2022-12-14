import { ISubCategory } from '@common-types/sub-category.types'
import ContextMenu from '@components/ui/context-menu/Context-menu'
import Link from '@components/ui/link/Link'
import Separator from '@components/ui/separator/Separator'
import useConfirm from '@hooks/useConfirm'
import { useRemoveSubCategory, useUpdateSubCategory } from '@query-hooks/useSubCategories'
import {
	CREATE_CATEGORY_PATH,
	CREATE_PRODUCT_PATH,
	CREATE_SUB_CATEGORY_PATH
} from '@utils/pages-paths'
import React, { FC, PropsWithChildren } from 'react'

interface Props {
	subCategory: ISubCategory
}

const SubCategoryContextMenu: FC<PropsWithChildren<Props>> = ({ children, subCategory }) => {
	const { Dialog, onConfirm } = useConfirm(
		'Вы уверены?',
		<div>
			<b>Удалить подкатегорию - {subCategory.name}?</b>
			<p>Продукты и категории затронуты не будут</p>
		</div>
	)

	const { mutate: removeSubCategory } = useRemoveSubCategory()
	const { mutate: updateSubCategory } = useUpdateSubCategory()

	const isHiddenSubCategory = !!subCategory.dateDeleted

	const onRemove = async () => {
		const isConfirmed = await onConfirm()

		if (isConfirmed) {
			removeSubCategory(subCategory.id)
		}
	}

	const onHide = (hidden: boolean) => {
		if (hidden) {
			updateSubCategory({ id: subCategory.id, dto: { ...subCategory, hidden: false } })
		} else {
			updateSubCategory({ id: subCategory.id, dto: { ...subCategory, hidden: true } })
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
						<Link href={CREATE_SUB_CATEGORY_PATH}>Создать подкатегорию</Link>
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link href={CREATE_CATEGORY_PATH}>Создать категорию</Link>
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link
							href={{
								pathname: CREATE_PRODUCT_PATH,
								query: { categoryId: subCategory.categoryId, subCategoryId: subCategory.id }
							}}
						>
							Добавить продукт
						</Link>
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item>Редактировать</ContextMenu.Item>

					<ContextMenu.Item onClick={() => onHide(isHiddenSubCategory)}>
						{isHiddenSubCategory ? 'Вернуть' : 'Скрыть'}
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={onRemove}>Удалить</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu>
		</>
	)
}

export default SubCategoryContextMenu
