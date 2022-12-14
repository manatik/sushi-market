import { IIngredient } from '@common-types/ingredient.types'
import ContextMenu from '@components/ui/context-menu/Context-menu'
import Link from '@components/ui/link/Link'
import Separator from '@components/ui/separator/Separator'
import useConfirm from '@hooks/useConfirm'
import { useRemoveIngredient } from '@query-hooks/useIngredients'
import { CREATE_INGREDIENT_PATH, CREATE_PRODUCT_PATH } from '@utils/pages-paths'
import React, { FC, PropsWithChildren } from 'react'

interface Props {
	ingredient: IIngredient
}

const IngredientContextMenu: FC<PropsWithChildren<Props>> = ({ children, ingredient }) => {
	const { Dialog, onConfirm } = useConfirm(
		'Вы уверены?',
		<div>
			<b>Удалить ингредиент - {ingredient.name}?</b>
		</div>
	)

	const { mutate: removeIngredient } = useRemoveIngredient()

	const onRemove = async () => {
		const isConfirmed = await onConfirm()

		if (isConfirmed) {
			removeIngredient(ingredient.id)
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
						<Link href={CREATE_PRODUCT_PATH}>Добавить продукт</Link>
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link href={CREATE_INGREDIENT_PATH}>Добавить ингредиент</Link>
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item>Редактировать</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={onRemove}>Удалить</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu>
		</>
	)
}

export default IngredientContextMenu
