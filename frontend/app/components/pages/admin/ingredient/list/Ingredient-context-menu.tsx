import { FC, PropsWithChildren } from 'react'

import UpdateIngredient from '@components/pages/admin/ingredient/update/Ingredient'
import ContextMenu from '@components/ui/context-menu/Context-menu'
import Link from '@components/ui/link/Link'
import Separator from '@components/ui/separator/Separator'

import { useRemoveIngredient } from '@query-hooks/useIngredients'

import { IIngredient } from '@common-types/ingredient.types'

import useConfirm from '@hooks/useConfirm'
import { useContextMenu } from '@hooks/useContextMenu'

import { CREATE_INGREDIENT_PATH, CREATE_PRODUCT_PATH } from '@utils/pages-paths'

interface Props extends PropsWithChildren {
	ingredient: IIngredient
}

const IngredientContextMenu: FC<Props> = ({ children, ingredient }) => {
	const { Dialog, onConfirm } = useConfirm(
		'Вы уверены?',
		<div>
			<b>Удалить ингредиент - {ingredient.name}?</b>
		</div>
	)

	const { ContextActions, action, handleAction, selectedItem } = useContextMenu<IIngredient>()
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

			{selectedItem && action === ContextActions.EDIT && (
				<UpdateIngredient ingredient={selectedItem} isOpen={!!selectedItem} onClose={handleAction} />
			)}

			<ContextMenu>
				<ContextMenu.Title>{children}</ContextMenu.Title>

				<ContextMenu.Content>
					<ContextMenu.Item onClick={() => handleAction(ingredient, ContextActions.DETAILS)}>
						Подробнее
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link href={CREATE_PRODUCT_PATH}>Добавить продукт</Link>
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link href={CREATE_INGREDIENT_PATH}>Добавить ингредиент</Link>
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={() => handleAction(ingredient, ContextActions.EDIT)}>
						Редактировать
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={onRemove}>Удалить</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu>
		</>
	)
}

export default IngredientContextMenu
