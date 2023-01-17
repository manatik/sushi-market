import { IProduct } from '@common-types/product.types'
import UpdateProduct from '@components/pages/admin/product/update/product'
import ContextMenu from '@components/ui/context-menu/Context-menu'
import Link from '@components/ui/link/Link'
import Separator from '@components/ui/separator/Separator'
import useConfirm from '@hooks/useConfirm'
import { useContextMenu } from '@hooks/useContextMenu'
import { useRemoveProduct, useUpdateProduct } from '@query-hooks/useProducts'
import {
	CREATE_CATEGORY_PATH,
	CREATE_INGREDIENT_PATH,
	CREATE_PRODUCT_PATH,
	CREATE_SUB_CATEGORY_PATH
} from '@utils/pages-paths'
import { FC, PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
	product: IProduct
}

const ProductContextMenu: FC<Props> = ({ children, product }) => {
	const { Dialog, onConfirm } = useConfirm(
		'Вы уверены?',
		<div>
			<b>Удалить продукт - {product.name}?</b>
			<p>Ингредиенты затронуты не будут</p>
		</div>
	)

	const { ContextActions, action, handleAction, selectedItem } = useContextMenu<IProduct>()
	const { mutate: removeProduct } = useRemoveProduct()
	const { mutate: updateProduct } = useUpdateProduct()

	const isHiddenProduct = !!product.dateDeleted

	const onRemove = async () => {
		const isConfirmed = await onConfirm()

		if (isConfirmed) {
			removeProduct(product.id)
		}
	}

	const onHide = (hidden: boolean) => {
		if (hidden) {
			updateProduct({ id: product.id, dto: { ...product, hidden: false } })
		} else {
			updateProduct({ id: product.id, dto: { ...product, hidden: true } })
		}
	}

	return (
		<>
			<Dialog />

			{selectedItem && action === ContextActions.EDIT && (
				<UpdateProduct product={selectedItem} isOpen={!!selectedItem} onClose={handleAction} />
			)}

			<ContextMenu>
				<ContextMenu.Title>{children}</ContextMenu.Title>

				<ContextMenu.Content>
					<ContextMenu.Item onClick={() => handleAction(product, ContextActions.DETAILS)}>Подробнее</ContextMenu.Item>

					<ContextMenu.Item>
						<Link href={CREATE_CATEGORY_PATH}>Создать категорию</Link>
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link
							href={{
								pathname: CREATE_SUB_CATEGORY_PATH,
								query: { categoryId: product.categoryId }
							}}
						>
							Добавить подкатегорию
						</Link>
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link
							href={{
								pathname: CREATE_PRODUCT_PATH,
								query: { categoryId: product.categoryId, subCategoryId: product.subCategoryId }
							}}
						>
							Добавить продукт
						</Link>
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link href={CREATE_INGREDIENT_PATH}>Добавить ингредиент</Link>
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={() => handleAction(product, ContextActions.EDIT)}>Редактировать</ContextMenu.Item>

					<ContextMenu.Item onClick={() => onHide(isHiddenProduct)}>
						{isHiddenProduct ? 'Вернуть' : 'Скрыть'}
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={onRemove}>Удалить</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu>
		</>
	)
}

export default ProductContextMenu
