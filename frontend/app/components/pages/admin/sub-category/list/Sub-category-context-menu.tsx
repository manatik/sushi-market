import { ISubCategory } from '@common-types/sub-category.types'
import UpdateSubCategory from '@components/pages/admin/sub-category/update/Sub-category'
import ContextMenu from '@components/ui/context-menu/Context-menu'
import Link from '@components/ui/link/Link'
import Separator from '@components/ui/separator/Separator'
import useConfirm from '@hooks/useConfirm'
import { useContextMenu } from '@hooks/useContextMenu'
import { useRemoveSubCategory, useUpdateSubCategory } from '@query-hooks/useSubCategories'
import { CREATE_CATEGORY_PATH, CREATE_PRODUCT_PATH, CREATE_SUB_CATEGORY_PATH } from '@utils/pages-paths'
import { FC, PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
	subCategory: ISubCategory
}

const SubCategoryContextMenu: FC<Props> = ({ children, subCategory }) => {
	const { Dialog, onConfirm } = useConfirm(
		'Вы уверены?',
		<div>
			<b>Удалить подкатегорию - {subCategory.name}?</b>
			<p>Продукты и категории затронуты не будут</p>
		</div>
	)

	const { ContextActions, action, handleAction, selectedItem } = useContextMenu<ISubCategory>()
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

			{selectedItem && action === ContextActions.EDIT && (
				<UpdateSubCategory subCategory={selectedItem} isOpen={!!selectedItem} onClose={handleAction} />
			)}

			<ContextMenu>
				<ContextMenu.Title>{children}</ContextMenu.Title>

				<ContextMenu.Content>
					<ContextMenu.Item onClick={() => handleAction(subCategory, ContextActions.DETAILS)}>
						Подробнее
					</ContextMenu.Item>

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

					<ContextMenu.Item onClick={() => handleAction(subCategory, ContextActions.EDIT)}>
						Редактировать
					</ContextMenu.Item>

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
