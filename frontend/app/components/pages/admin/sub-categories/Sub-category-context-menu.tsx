import { ISubCategory } from '@common-types/sub-category.types'
import ContextMenu from '@components/ui/context-menu/Context-menu'
import Link from '@components/ui/link/Link'
import Separator from '@components/ui/separator/Separator'
import useConfirm from '@hooks/useConfirm'
import { useRemoveSubCategory } from '@query-hooks/useSubCategories'
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
		`Удалить подкатегорию - ${subCategory.name}?`
	)

	const { mutate: removeSubCategory } = useRemoveSubCategory()

	const onRemove = async () => {
		const isConfirmed = await onConfirm()

		if (isConfirmed) {
			removeSubCategory(subCategory.id)
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

					<ContextMenu.Item>Редактировать</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={onRemove}>Удалить</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu>
		</>
	)
}

export default SubCategoryContextMenu
